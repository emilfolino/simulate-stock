import io from 'socket.io-client';
import Rickshaw from 'rickshaw';
import 'rickshaw/rickshaw.min.css';

(function() {
    let graphs = {};
    let first = true;
    let index = 0;
    let graphContainer = document.getElementById("graphs");
    let socket = io.connect("http://localhost:3000");

    socket.on('connect', () => {
        console.log("Connected");
    });

    socket.on('disconnect', () => {
        console.log("Disconnected");
    });

    socket.on('stocks', (message) => {
        if (first) {
            message.map((cake, index) => {
                let graph = createGraph(graphContainer, cake, index);

                graph.configure({
                    width: graphContainer.clientWidth,
                });
                graph.render();

                let slug = slugify(cake.name);

                graphs[slug] = {
                    name: cake.name,
                    graph: graph,
                    series: [],
                };
            });
            first = false;
        }

        message.map((cake) => {
            let slug = slugify(cake.name);

            graphs[slug].graph.series.addData({
                y: cake.startingPoint,
            });
            graphs[slug].graph.render();
        });

        index++;
    });
})();

function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

function createGraph(parent, element, index) {
    let colors = ["#ff851b", "#0074d9"];
    let graphElement = document.createElement("div");

    parent.appendChild(graphElement);

    return new Rickshaw.Graph({
        element: graphElement,
        width: "500",
        height: "180",
        renderer: "line",
        series: new Rickshaw.Series.FixedDuration([{
            name: element.name,
            color: colors[index%(colors.length)],
        }], undefined, {
            timeInterval: 5000,
            maxDataPoints: 1000,
            timeBase: new Date().getTime() / 1000
        })
    });
}
