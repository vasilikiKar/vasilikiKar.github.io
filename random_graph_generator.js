var randomGraph2 = {
    nodes: [],
    links: []
};
var deleteEdgeMode = false;


document.addEventListener('DOMContentLoaded', function () {
    var createRandomGraphButton = document.querySelector('.random-graph-creation');
    var randomGraphModal = new bootstrap.Modal(document.getElementById('randomGraphModal'));
    var inputGraphButton = document.querySelector('.graph-input');
    var inputGraphModal = new bootstrap.Modal(document.getElementById('inputGraphModal'));
    var adjacencyModal = new bootstrap.Modal(document.getElementById('adjacencyMatrixModal'));
    const canvas = document.getElementById('canvas-section');
    var deleteVertexMode = false;
    var randomGraph = [];

    var isDirected;
    var addVertexMode = false; // Flag to indicate add vertex mode


    //This is fine
    // Event listener for Add Vertex button
    const addVertexButton = document.querySelector('.add-vertex-button');
    addVertexButton.addEventListener('click', function () {
        addVertexMode = !addVertexMode; // Set add vertex mode to 
        if (addVertexMode) {
            addVertexButton.classList.add('active');
        } else {
            addVertexButton.classList.remove('active');
        }
        deleteEdgeMode = false;
        deleteEdgeButton.classList.remove('active');
        deleteVertexMode = false;
        deleteVertexButton.classList.remove('active');

    });


    //This is fine (remove clearGraph)
    canvas.addEventListener('click', function (event) {
        if (addVertexMode && randomGraph2) { // Check if add vertex mode is active and randomGraph exists    
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            // Add a new vertex to the nodes array
            const newNode = {
                id: randomGraph2.nodes.length, // ID as a number based on the current count of nodes
                index: randomGraph2.nodes.length, // Index can also be the same as id
                x: x, // Set x position
                y: y, // Set y position
                vx: null, // Initialize vx as null
                vy: null  // Initialize vy as null
            };
            randomGraph2.nodes.push(newNode);

            // // Optional: Create links if you want to connect this new node with existing nodes
            // if (randomGraph2.nodes.length > 1) {
            //     randomGraph2.links.push({
            //         source: newNode,
            //         target: randomGraph2.nodes[0], // Link to the first node (or any other existing node)
            //         type: 'unidirectional'
            //     });
            // }


            // // Redraw the graph
            clearGraph();
            plotGraph(randomGraph2.nodes, randomGraph2.links);
        }
    });

    //This is fine
    const deleteVertexButton = document.querySelector('.delete-vertex-button');
    deleteVertexButton.addEventListener('click', function () {
        // Toggle delete mode
        deleteVertexMode = !deleteVertexMode;
        if (deleteVertexMode) {
            deleteVertexButton.classList.add('active');
        } else {
            deleteVertexButton.classList.remove('active');
        }
        deleteEdgeMode = false;
        deleteEdgeButton.classList.remove('active');
        addVertexMode = false;
        addVertexButton.classList.remove('active');
    });

    //This is fine (remove clearGraph)
    canvas.addEventListener('click', function (event) {
        // Check if delete vertex mode is active
        if (deleteVertexMode && randomGraph2) {
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            let vertexToDelete = null;
            const radius = 10; // The radius to check around the vertex

            // Iterate through the nodes to check if the click is within any vertex
            for (let i = 0; i < randomGraph2.nodes.length; i++) {
                const node = randomGraph2.nodes[i];

                // Check if the click is within the bounding circle of the vertex
                if (Math.pow(x - node.x, 2) + Math.pow(y - node.y, 2) < Math.pow(radius, 2)) {
                    vertexToDelete = node;
                    break; // Exit loop since only one vertex can be deleted at a time
                }
            }

            // If a vertex was clicked (i.e., found within the radius)
            if (vertexToDelete) {
                // Remove the vertex from the nodes array
                randomGraph2.nodes = randomGraph2.nodes.filter(node => node !== vertexToDelete);

                // Remove links connected to the vertex
                randomGraph2.links = randomGraph2.links.filter(link =>
                    link.source !== vertexToDelete && link.target !== vertexToDelete
                );

                // Redraw the graph
                clearGraph();
                plotGraph(randomGraph2.nodes, randomGraph2.links);
            }
        }
    });

    //This is fine
    const deleteEdgeButton = document.querySelector('.delete-edge-button');
    deleteEdgeButton.addEventListener('click', function () {
        // Toggle delete mode
        deleteEdgeMode = !deleteEdgeMode;
        if (deleteEdgeMode) {
            deleteEdgeButton.classList.add('active');
        } else {
            deleteEdgeButton.classList.remove('active');
        }
        deleteVertexMode = false;
        deleteVertexButton.classList.remove('active');
        addVertexMode = false;
        addVertexButton.classList.remove('active');
    });

    //This is fine (remove clearGraph)
    // canvas.addEventListener('click', function (event) {
    //     // Check if delete edge mode is active
    //     if (deleteEdgeMode && randomGraph2) {
    //         const rect = canvas.getBoundingClientRect();
    //         const x = event.clientX - rect.left;
    //         const y = event.clientY - rect.top;


    //         let edgeToDelete = null;
    //         const threshold = 2; // Threshold distance to consider a click near the edge


    //         // Iterate through the edges (links) to check if the click is near any edge
    //         for (let i = 0; i < randomGraph2.links.length; i++) {
    //             const link = randomGraph2.links[i];
    //             const source = link.source;
    //             const target = link.target;

    //             // Get the coordinates of the source and target nodes
    //             const x1 = source.x;
    //             const y1 = source.y;
    //             const x2 = target.x;
    //             const y2 = target.y;


    //             // Calculate the distance from the click point to the line formed by the edge
    //             const dist = Math.abs((y2 - y1) * x - (x2 - x1) * y + x2 * y1 - y2 * x1) /
    //                 Math.sqrt((y2 - y1) ** 2 + (x2 - x1) ** 2);

    //             console.log(dist)

    //             // If the click is near the edge, mark it for deletion
    //             if (dist < threshold) {
    //                 edgeToDelete = link;
    //                 break; // Exit the loop since only one edge will be deleted at a time
    //             }
    //         }

    //         // If an edge was clicked (i.e., found near the click point)
    //         if (edgeToDelete) {
    //             // Remove the edge from the links array
    //             randomGraph2.links = randomGraph2.links.filter(link => link !== edgeToDelete);

    //             // Redraw the graph
    //             clearGraph();
    //             plotGraph(randomGraph2.nodes, randomGraph2.links);
    //         }
    //     }
    // });

    //This is fine
    createRandomGraphButton.addEventListener('click', function () {
        randomGraphModal.show();
        deleteVertexMode = false;
        deleteEdgeMode = false;
        deleteVertexButton.classList.remove('active');
        deleteEdgeButton.classList.remove('active');
        addVertexMode = false;
        addVertexButton.classList.remove('active');
    });

    //This is fine
    inputGraphButton.addEventListener('click', function () {
        inputGraphModal.show();
        deleteVertexMode = false;
        deleteEdgeMode = false;
        deleteVertexButton.classList.remove('active');
        deleteEdgeButton.classList.remove('active');
        addVertexMode = false;
        addVertexButton.classList.remove('active');
    });

    // //This is fine
    var randomGraphForm = document.getElementById('randomGraphForm');
    randomGraphForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Clear previous error messages
        document.getElementById('verticesError').textContent = '';
        document.getElementById('graphTypeError').textContent = '';

        // Retrieve user input
        var vertices = document.getElementById('verticesInput').value;
        var isValid = true;

        // Validate vertices input (must be a positive integer)
        if (!vertices || vertices <= 0) {
            document.getElementById('verticesError').textContent = 'Please enter a valid number of vertices (greater than 0).';
            isValid = false;
        }

        // Retrieve selected graph type
        var graphType = document.querySelector('input[name="graphType"]:checked');
        var selectedGraphType = graphType ? graphType.value : '';

        // Validate graph type (must be selected)
        if (!selectedGraphType) {
            document.getElementById('graphTypeError').textContent = 'Please select a graph type (directed or undirected).';
            isValid = false;
        }

        // Proceed only if the form is valid
        if (isValid) {
            randomGraph2 = generateRandomGraph2(vertices, selectedGraphType);
            clearGraph();
            plotGraph(randomGraph2.nodes, randomGraph2.links);

            // Close the modal using Bootstrap's built-in functions if needed
            randomGraphModal.hide();
        }
    });

    //This is fine
    var inputGraphForm = document.getElementById('inputGraphForm');
    inputGraphForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Get the value of the selected radio button
        var graphType = document.querySelector('input[name="graphFormat"]:checked').value;
        // Show the corresponding modal based on the selected radio button
        if (graphType === 'adjacency') {
            document.getElementById('adjacencyMatrixError').textContent = '';
            adjacencyModal.show();
        } else if (graphType === 'incidence') {
            var incidenceModal = new bootstrap.Modal(document.getElementById('incidenceMatrixModal'));
            document.getElementById('incidenceMatrixError').textContent = '';
            incidenceModal.show();
        }
    });


    //This is fine
    var findEulerCycleButton = document.querySelector('.euler-actions .btn-secondary:nth-child(1)');
    findEulerCycleButton.addEventListener('click', function () {
        if (randomGraph) {
            calculateEulerCycle(randomGraph, isDirected, canvas)
            calculateEulerCycle2(randomGraph2.nodes, randomGraph2.links, isDirected, canvas)
        }
        deleteVertexMode = false;
        deleteEdgeMode = false;
        deleteVertexButton.classList.remove('active');
        deleteEdgeButton.classList.remove('active');
        addVertexMode = false;
        addVertexButton.classList.remove('active');
    });

    //This is fine
    var findEulerPathButton = document.querySelector('.euler-actions .btn-secondary:nth-child(2)');
    findEulerPathButton.addEventListener('click', function () {
        if (randomGraph) {
            calculateEulerPath(randomGraph, isDirected, canvas)
            calculateEulerPath2(randomGraph2.nodes, randomGraph2.links, isDirected, canvas)
        }
        deleteVertexMode = false;
        deleteEdgeMode = false;
        deleteVertexButton.classList.remove('active');
        deleteEdgeButton.classList.remove('active');
        addVertexMode = false;
        addVertexButton.classList.remove('active');
    });

    //This is fine
    // Add an event listener for the modal hide event to remove the background overlay
    randomGraphModal._element.addEventListener('hidden.bs.modal', function () {
        randomGraphModal._element.style.background = 'none';
    });

    //This is fine
    // Add an event listener for the modal hide event to remove the background overlay
    inputGraphModal._element.addEventListener('hidden.bs.modal', function () {
        inputGraphModal._element.style.background = 'none';
    });

    //This is fine
    // Get a reference to the clear button
    var clearCanvasButton = document.getElementById('clear_button');
    // // Add an event listener to handle the click event
    clearCanvasButton.addEventListener('click', function () {
        // Clear the canvas
        clearGraph();
        randomGraph = [];
        deleteVertexMode = false;
        deleteEdgeMode = false;
        deleteVertexButton.classList.remove('active');
        deleteEdgeButton.classList.remove('active');
        addVertexMode = false;
        addVertexButton.classList.remove('active');
    });

    //This is fine
    const saveButton = document.querySelector('.save-button');
    saveButton.addEventListener('click', function () {
        // Select the D3-generated SVG element
        const svg = document.querySelector('.canvas-section svg');

        // Serialize the SVG element to an XML string
        const serializer = new XMLSerializer();
        const svgXml = serializer.serializeToString(svg);

        //  Create a blob from the SVG XML
        const blob = new Blob([svgXml], { type: 'image/svg+xml' });

        // Create a temporary link element
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = 'graph.svg'; // Set the download file name

        // Append the link to the body and trigger the download
        document.body.appendChild(downloadLink);
        downloadLink.click();

        // Clean up: remove the link from the DOM and revoke the blob URL
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(downloadLink.href);
    });
});

//This is fine
function generateRandomGraph2(vertices, graphType) {
    if (vertices <= 0) {
        throw new Error('Number of vertices must be a positive integer.');
    }

    if (graphType !== 'directed' && graphType !== 'undirected') {
        throw new Error('Graph type must be either "directed" or "undirected".');
    }

    const graph = Array.from({ length: vertices }, () => Array(vertices).fill(0));

    const addEdge = (i, j) => {
        if (Math.random() < 0.5) {
            graph[i][j] = 1;
            if (graphType === 'undirected') {
                graph[j][i] = 1;
            }
        }
    };

    if (graphType === 'directed') {
        for (let i = 0; i < vertices; i++) {
            for (let j = 0; j < vertices; j++) {
                if (i !== j) {
                    addEdge(i, j);
                }
            }
        }
    } else {
        for (let i = 0; i < vertices; i++) {
            for (let j = i + 1; j < vertices; j++) {
                addEdge(i, j);
            }
        }
    }


    const nodes = Array.from({ length: vertices }, (_, i) => ({ id: i }));
    const links = [];
    for (let i = 0; i < vertices; i++) {
        for (let j = 0; j < vertices; j++) {
            if (graph[i][j]) {
                links.push({ source: i, target: j, type: 'unidirectional' });
                if (graphType === 'undirected' && i < j) {
                    links.push({ source: j, target: i, type: 'unidirectional' });
                }
            }
        }
    }

    return { nodes, links };
}


function drawGraph(adjacencyMatrix, canvas, isDirected, eulerCycle) {
    const ctx = canvas.getContext("2d");

    const aspectRatio = 1.5;
    canvas.width = 900;
    canvas.height = canvas.width / aspectRatio;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const numVertices = adjacencyMatrix.length;
    const radius = 30;

    // Define some constants for positioning
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const angleIncrement = (2 * Math.PI) / numVertices;

    // Draw vertices
    for (let i = 0; i < numVertices; i++) {
        const x = centerX + 200 * Math.cos(i * angleIncrement);
        const y = centerY + 200 * Math.sin(i * angleIncrement);

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.fillStyle = "#d0e9c6";
        ctx.strokeStyle = "#caa1db";
        ctx.stroke();
        ctx.fill();

        // Label vertices
        ctx.fillStyle = "#caa1db";
        ctx.font = "bold 16px Arial";
        ctx.fillText(i + 1, x - 5, y + 5);
    }

    // Draw edges
    const arrowSize = 10;
    for (let i = 0; i < numVertices; i++) {
        for (let j = 0; j < numVertices; j++) {
            if (adjacencyMatrix[i][j] === 1) {
                const x1 = centerX + 200 * Math.cos(i * angleIncrement);
                const y1 = centerY + 200 * Math.sin(i * angleIncrement);
                const x2 = centerX + 200 * Math.cos(j * angleIncrement);
                const y2 = centerY + 200 * Math.sin(j * angleIncrement);

                // Draw the line
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);

                // Highlight edges in the Eulerian cycle
                if (eulerCycle && isEdgeInCycle(i, j, eulerCycle)) {
                    ctx.strokeStyle = "#ff0000"; // Red color for highlighted edges
                } else {
                    ctx.strokeStyle = "#caa1db"; // Default color for other edges
                }

                ctx.stroke();

                // Draw the arrowhead
                if (isDirected) {
                    const angle = Math.atan2(y2 - y1, x2 - x1);
                    ctx.beginPath();
                    ctx.moveTo(x2, y2);
                    ctx.lineTo(x2 - arrowSize * Math.cos(angle - Math.PI / 6), y2 - arrowSize * Math.sin(angle - Math.PI / 6));
                    ctx.lineTo(x2 - arrowSize * Math.cos(angle + Math.PI / 6), y2 - arrowSize * Math.sin(angle + Math.PI / 6));
                    ctx.fillStyle = "#caa1db";
                    ctx.fill();
                }
            }
        }
    }
}

//This is fine
function calculateEulerCycle(graph, isDirected, canvas) {
    const numVertices = graph.length;

    // Check if the graph has an Euler cycle
    for (let i = 0; i < numVertices; i++) {
        let inDegree = 0;
        let outDegree = 0;

        for (let j = 0; j < numVertices; j++) {
            if (!isDirected && i !== j) {
                // For undirected graphs, count both directions of edges
                inDegree += graph[i][j];
                outDegree += graph[i][j];
            } else {
                inDegree += graph[j][i];  // In-degree for directed graphs
                outDegree += graph[i][j]; // Out-degree for directed graphs
            }
        }


        if (isDirected) {
            if (inDegree !== outDegree) {
                // showToast("Graph does not have an Euler cycle. In-degree must equal out-degree for each vertex.");
                return null;
            }
        } else {
            // For undirected graphs, check if all vertices have an even degree
            if (inDegree % 2 !== 0 || outDegree % 2 !== 0 || inDegree === 0) {
                // showToast("Graph does not have an Euler cycle. All vertices must have an even degree.");
                return null;
            }
        }
    }

    // Create a copy of the graph to track visited edges
    const visitedEdges = new Array(numVertices);
    for (let i = 0; i < numVertices; i++) {
        visitedEdges[i] = new Array(numVertices).fill(0);
    }


    const cycle = [];

    // Function to perform DFS to find the Eulerian cycle
    function dfs(v) {
        for (let u = 0; u < numVertices; u++) {
            if (graph[v][u] === 1 && !visitedEdges[v][u]) {
                visitedEdges[v][u] = 1;

                if (!isDirected) {
                    visitedEdges[u][v] = 1;  // Mark the reverse edge for undirected graphs
                }

                dfs(u);
            }
        }

        cycle.push(v);
    }


    // Choose a starting vertex (assumes the graph has an Euler cycle)
    const startVertex = 0;

    // Perform DFS to find the Eulerian cycle
    dfs(startVertex);

    // Reverse the cycle to get the correct order
    cycle.reverse();

    const eulerianCycle = cycle.map(value => value + 1);

    showToast(`Graph has eulerian cycle: ${eulerianCycle.join('=>')}`);
    // drawGraph(graph, canvas, isDirected, cycle);


    return cycle;
}

//This is fine
function calculateEulerCycle2(nodes, links, isDirected, canvas) {
    const numVertices = nodes.length;

    // Remove duplicate edges for undirected graphs
    if (!isDirected) {
        links = removeDuplicateEdges(links);
    }

    // Initialize degree counts
    const inDegree = Array(numVertices).fill(0);
    const outDegree = Array(numVertices).fill(0);

    // Calculate in-degrees and out-degrees
    links.forEach(link => {
        outDegree[link.source.id]++;
        inDegree[link.target.id]++;
    });

    // Check if the graph has an Eulerian cycle
    if (!hasEulerianCycle(numVertices, inDegree, outDegree, isDirected)) {
        return null;
    }

    // Build adjacency list for undirected graph
    const adjList = buildAdjacencyList(links);

    const cycle = [];
    const stack = [];
    let startVertex = 0; // Start from an arbitrary vertex, assuming it's connected

    stack.push(startVertex);

    while (stack.length > 0) {
        const currentVertex = stack[stack.length - 1];

        if (adjList[currentVertex].length > 0) {
            const nextVertex = adjList[currentVertex].pop();
            // Remove edge from the other end too for undirected graph
            adjList[nextVertex] = adjList[nextVertex].filter(v => v !== currentVertex);

            stack.push(nextVertex);
        } else {
            cycle.push(stack.pop());
        }
    }

    if (cycle.length - 1 !== links.length) {
        showToast("Graph does not have an Eulerian cycle as not all edges were used.");
        return null;
    }

    cycle.reverse(); // Reverse to get the correct order
    const eulerianCycle = cycle.map(v => v + 1); // Adjust indices if needed

    showToast(`Graph has Eulerian cycle: ${eulerianCycle.join(' => ')}`);
    // drawGraph({ nodes, links }, canvas, isDirected, eulerianCycle);


    return eulerianCycle;
}

//This is fine
function hasEulerianCycle(numVertices, inDegree, outDegree, isDirected) {
    for (let i = 0; i < numVertices; i++) {
        if (isDirected) {
            if (inDegree[i] !== outDegree[i]) {
                showToast("Graph does not have an Euler cycle. In-degree must equal out-degree for each vertex.");
                return false;
            }
        } else {
            if ((inDegree[i] + outDegree[i]) % 2 !== 0 || inDegree[i] + outDegree[i] === 0) {
                showToast("Graph does not have an Euler cycle. All vertices must have an even degree.");
                return false;
            }
        }
    }
    return true;
}

//This is fine
function buildAdjacencyList(links) {
    const adjList = {};

    links.forEach(link => {
        if (!adjList[link.source.id]) {
            adjList[link.source.id] = [];
        }
        if (!adjList[link.target.id]) {
            adjList[link.target.id] = [];
        }

        adjList[link.source.id].push(link.target.id);
        adjList[link.target.id].push(link.source.id); // Undirected graph: add edge in both directions
    });

    return adjList;
}

//This is fine
function removeDuplicateEdges(links) {
    const uniqueLinks = [];
    const seenEdges = new Set();

    links.forEach(link => {
        const [source, target] = [link.source.id, link.target.id];
        const edgeKey = source < target ? `${source}-${target}` : `${target}-${source}`;

        if (!seenEdges.has(edgeKey)) {
            uniqueLinks.push(link);
            seenEdges.add(edgeKey);
        }
    });

    return uniqueLinks;
}

//This is fine
function calculateEulerPath(graph, isDirected, canvas) {
    const numVertices = graph.length;

    // Check if the graph has an Euler path
    let startVertex = 0;
    let endVertex = 0;
    let oddDegreeCount = 0;

    // Determine odd-degree vertices
    for (let i = 0; i < numVertices; i++) {
        let inDegree = 0;
        let outDegree = 0;

        for (let j = 0; j < numVertices; j++) {
            if (!isDirected && i !== j) {
                inDegree += graph[i][j];
                outDegree += graph[i][j];
            } else {
                inDegree += graph[j][i];
                outDegree += graph[i][j];
            }
        }

        if (isDirected) {
            const degreeDifference = outDegree - inDegree;
            if (degreeDifference === 1) {
                startVertex = i;
                oddDegreeCount++;
            } else if (degreeDifference === -1) {
                endVertex = i;
                oddDegreeCount++;
            } else if (Math.abs(degreeDifference) > 1) {
                showToast("Graph does not have an Euler path. Vertex degrees are not valid.");
                return null;
            }
        } else {
            if (inDegree % 2 !== 0 || outDegree % 2 !== 0) {
                oddDegreeCount++;
                if (oddDegreeCount > 2) {
                    showToast("Graph does not have an Euler path. More than two vertices have odd degrees.");
                    return null;
                }

                if (outDegree - inDegree === 1) {
                    startVertex = i;
                } else if (inDegree - outDegree === 1) {
                    endVertex = i;
                }
            }
        }
    }

    if (oddDegreeCount === 0 || oddDegreeCount === 2) {
        // Create a copy of the graph to track visited edges
        const visitedEdges = new Array(numVertices);
        for (let i = 0; i < numVertices; i++) {
            visitedEdges[i] = new Array(numVertices).fill(0);
        }

        const path = [];

        // Function to perform DFS to find the Eulerian path
        function dfs(v) {
            for (let u = 0; u < numVertices; u++) {
                if (graph[v][u] === 1 && !visitedEdges[v][u]) {
                    visitedEdges[v][u] = 1;

                    if (!isDirected) {
                        visitedEdges[u][v] = 1;
                    }

                    dfs(u);
                }
            }

            path.push(v);
        }

        // Choose the starting vertex
        startVertex = (oddDegreeCount === 0) ? 0 : startVertex;

        // Perform DFS to find a cycle
        dfs(startVertex);

        // Reverse the path to get the correct order
        path.reverse();

        // Find the position of the starting vertex in the path
        const startPos = path.indexOf(startVertex);

        // Concatenate the path from startPos to the end and from 0 to startPos (if necessary)
        const eulerianPath = path.slice(startPos).concat(path.slice(0, startPos));

        showToast(`Graph has an Euler path: ${eulerianPath.map(value => value + 1).join('=>')}`);
        // drawGraph(graph, canvas, isDirected, eulerianPath);

        return eulerianPath;
    } else {
        showToast("Graph does not have an Euler path. Vertex degrees are not valid.");
        return null;
    }
}

//This is fine
function calculateEulerPath2(nodes, links, isDirected, canvas) {
    const numVertices = nodes.length;

    // Remove duplicate edges for undirected graphs
    if (!isDirected) {
        links = removeDuplicateEdges(links);
    }

    // Initialize degree counts
    const inDegree = Array(numVertices).fill(0);
    const outDegree = Array(numVertices).fill(0);

    // Calculate in-degrees and out-degrees
    links.forEach(link => {
        outDegree[link.source.id]++;
        inDegree[link.target.id]++;
    });


    // Check if the graph has an Eulerian path
    const startVertex = findStartVertexForEulerianPath(numVertices, inDegree, outDegree, isDirected);

    if (startVertex === -1) {
        showToast("Graph does not have an Eulerian path.");
        return null;
    }

    // Build adjacency list for undirected graph
    const adjList = buildAdjacencyList(links);

    const path = [];
    const stack = [];
    stack.push(startVertex);

    while (stack.length > 0) {
        const currentVertex = stack[stack.length - 1];

        if (adjList[currentVertex].length > 0) {
            const nextVertex = adjList[currentVertex].pop();
            // Remove edge from the other end too for undirected graph
            adjList[nextVertex] = adjList[nextVertex].filter(v => v !== currentVertex);

            stack.push(nextVertex);
        } else {
            path.push(stack.pop());
        }
    }

    if (path.length - 1 !== links.length) {
        showToast("Graph does not have an Eulerian path as not all edges were used.");
        return null;
    }

    path.reverse(); // Reverse to get the correct order
    const eulerianPath = path.map(v => v + 1); // Adjust indices if needed

    showToast(`Graph has Eulerian path: ${eulerianPath.join(' => ')}`);
    // drawGraph({ nodes, links }, canvas, isDirected, eulerianPath);

    return eulerianPath;
}

//This is fine
// For a directed graph, if one vertex has outDegree - inDegree = 1, it should be the start vertex. 
// If one vertex has inDegree - outDegree = 1, it should be the end vertex.
// For an undirected graph, if two vertices have odd degrees, we can start from either.
function findStartVertexForEulerianPath(numVertices, inDegree, outDegree, isDirected) {
    let startVertex = 0;
    let startVertices = 0;
    let endVertices = 0;

    for (let i = 0; i < numVertices; i++) {
        if (isDirected) {
            if (outDegree[i] - inDegree[i] === 1) {
                startVertex = i;
                startVertices++;
            } else if (inDegree[i] - outDegree[i] === 1) {
                endVertices++;
            } else if (outDegree[i] !== inDegree[i]) {
                return -1; // No Eulerian Path
            }
        } else {
            if ((inDegree[i] + outDegree[i]) % 2 !== 0) {
                if (startVertices === 0) {
                    startVertex = i;
                }
                startVertices++;
            }
        }
    }

    if (isDirected && (startVertices > 1 || endVertices > 1)) {
        return -1; // No Eulerian Path
    }

    if (!isDirected && startVertices > 2) {
        return -1; // No Eulerian Path
    }

    return startVertex;
}


//This is fine
function isEdgeInCycle(i, j, eulerCycle) {
    for (let k = 0; k < eulerCycle.length - 1; k++) {
        const currentVertex = eulerCycle[k];
        const nextVertex = eulerCycle[k + 1];
        if ((currentVertex === i && nextVertex === j) || (currentVertex === j && nextVertex === i)) {
            return true;
        }
    }
    return false;
}

//This is fine
function showToast(message) {
    const toast = document.createElement('div');
    toast.classList.add('toast', 'toast-class');
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');

    const targetElement = document.getElementById('canvas-section');
    const targetRect = targetElement.getBoundingClientRect();
    toast.style.position = 'fixed';
    toast.style.top = `${targetRect.top}px`;
    toast.style.left = `${targetRect.left}px`;
    toast.style.width = '900px';

    const closeButton = document.createElement('button');
    closeButton.classList.add('btn-close', 'ml-auto');
    closeButton.setAttribute('type', 'button');
    closeButton.setAttribute('data-bs-dismiss', 'toast');
    closeButton.setAttribute('aria-label', 'Close');

    const body = document.createElement('div');
    body.classList.add('d-flex', 'justify-content-between', 'align-items-center', 'toast-body');
    body.textContent = message;
    body.appendChild(closeButton);
    toast.appendChild(body);
    document.body.appendChild(toast);


    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();
    toast.addEventListener('hidden.bs.toast', function () {
        document.body.removeChild(toast);
    });
}

//This is fine
document.getElementById('inputAdjacencyGraphForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const input = document.getElementById('adjacencyMatrixInput').value;
    const matrix = parseMatrix(input);
    if (matrix.some(row => row.some(isNaN))) {
        document.getElementById('adjacencyMatrixError').textContent = 'Invalid matrix format. Please check the instructions';
        return;
    }
    randomGraph2 = convertAdjacencyMatrixToGraph(matrix);

    if (randomGraph2) {
        clearGraph();
        plotGraph(randomGraph2.nodes, randomGraph2.links);
        document.querySelectorAll('.modal.show').forEach(modal => {
            var modalInstance = bootstrap.Modal.getInstance(modal); // Get the Bootstrap modal instance
            if (modalInstance) {
                modalInstance.hide(); // Hide the modal
            }
        });
    } else {
        alert('Invalid matrix');
    }
});

//This is fine
document.getElementById('inputIncidenceGraphForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const input = document.getElementById('incidenceMatrixInput').value;
    const matrix = parseMatrix(input);
    if (matrix.some(row => row.some(isNaN))) {
        document.getElementById('incidenceMatrixError').textContent = 'Invalid matrix format. Please check the instructions';
        return;
    }
    randomGraph2 = convertIncidenceMatrixToGraph(matrix);

    if (randomGraph2) {
        clearGraph();
        plotGraph(randomGraph2.nodes, randomGraph2.links);
        document.querySelectorAll('.modal.show').forEach(modal => {
            var modalInstance = bootstrap.Modal.getInstance(modal); // Get the Bootstrap modal instance
            if (modalInstance) {
                modalInstance.hide(); // Hide the modal
            }
        });
    } else {
        alert('Invalid matrix. Please check your input.');
    }
});

//This is fine
function parseMatrix(input) {
    try {
        return input.trim().split('\n').map(row => row.split(',').map(Number));
    } catch (error) {
        console.error('Error parsing matrix:', error);
        return null;
    }
}

//This is fine
function convertAdjacencyMatrixToGraph(matrix) {
    const nodes = matrix.map((_, i) => ({ id: i }));
    const links = [];
    const linkMap = new Map();

    matrix.forEach((row, i) => {
        row.forEach((value, j) => {
            if (value) {
                const key = `${i}-${j}`;
                const reverseKey = `${j}-${i}`;
                if (linkMap.has(reverseKey)) {
                    linkMap.set(reverseKey, 'bidirectional');
                } else {
                    linkMap.set(key, 'unidirectional');
                }
            }
        });
    });

    linkMap.forEach((type, key) => {
        const [source, target] = key.split('-').map(Number);
        links.push({ source, target, type });
        if (type === 'bidirectional') {
            links.push({ source: target, target: source, type });
        }
    });

    return { nodes, links };
}

//This is fine
function convertIncidenceMatrixToGraph(matrix) {
    const nodes = [];
    const links = [];
    const edgeCount = matrix[0].length;

    for (let i = 0; i < matrix.length; i++) {
        nodes.push({ id: i });
    }

    for (let j = 0; j < edgeCount; j++) {
        let source = null;
        let target = null;
        for (let i = 0; i < matrix.length; i++) {
            if (matrix[i][j] === 1) {
                if (source === null) {
                    source = i;
                } else {
                    target = i;
                }
            }
        }
        if (source !== null && target !== null) {
            links.push({ source, target, type: 'unidirectional' });
        }
    }

    return { nodes, links };
}

function plotGraph(nodes, links) {
    const width = 900, height = 600;

    // Create the SVG canvas
    const svg = d3.select('.canvas-section').append('svg')
        .attr('width', width)
        .attr('height', height);

    // Create simulation
    const simulation = d3.forceSimulation(nodes)
        .force('link', d3.forceLink(links).id(d => d.id).distance(200))
        .force('charge', d3.forceManyBody().strength(-50))
        .force('center', d3.forceCenter(width / 2, height / 2));

    // Arrowhead marker for unidirectional links
    svg.append('defs').append('marker')
        .attr('id', 'arrowhead')
        .attr('viewBox', '-0 -5 10 10')
        .attr('refX', 30) // Adjust to control arrowhead position
        .attr('refY', -2)
        .attr('orient', 'auto')
        .attr('markerWidth', 7)
        .attr('markerHeight', 7)
        .attr('xoverflow', 'visible')
        .append('svg:path')
        .attr('d', 'M 0,-5 L 10 ,0 L 0,5')
        .attr('fill', '#999');

    // Add links
    const link = svg.append('g')
        .selectAll('.link')
        .data(links)
        .enter().append('path')
        .attr('class', 'link')
        .attr('stroke', '#999')
        .attr('stroke-width', 2)
        .attr('fill', 'none')
        .attr('marker-end', d => d.type === 'unidirectional' ? 'url(#arrowhead)' : '')
        .on('click', function (event, d) {
            if (deleteEdgeMode) {
                // Remove the clicked link from the data
                randomGraph2.links = randomGraph2.links.filter(link => link !== d);

                // Redraw the graph
                clearGraph();
                plotGraph(randomGraph2.nodes, randomGraph2.links);
            }
        });

    // Add nodes
    const node = svg.append('g')
        .selectAll('.node')
        .data(nodes)
        .enter().append('circle')
        .attr('class', 'node')
        .attr('r', 20)
        .attr('fill', '#a5d1c7')
        .attr('stroke', '#CC99CC')
        .attr('stroke-width', 2)
        .call(drag(simulation));

    // Add text labels for each node
    const label = svg.append('g')
        .selectAll('.label')
        .data(nodes)
        .enter().append('text')
        .attr('class', 'label')
        .attr('dy', -3)
        .attr('text-anchor', 'middle')
        .text(d => d.id);


    // Simulation tick update
    simulation.on('tick', () => {
        link.attr('d', d => {
            const dx = d.target.x - d.source.x,
                dy = d.target.y - d.source.y,
                dr = Math.sqrt(dx * dx + dy * dy);
            return `M${d.source.x},${d.source.y}A${dr},${dr} 0 0,1 ${d.target.x},${d.target.y}`;
            // if (d.type === 'bidirectional') {
            //     const dx = d.target.x - d.source.x,
            //         dy = d.target.y - d.source.y,
            //         dr = Math.sqrt(dx * dx + dy * dy);
            //     return `M${d.source.x},${d.source.y}A${dr},${dr} 0 0,1 ${d.target.x},${d.target.y}`;
            // } else {
            //     return `M${d.source.x},${d.source.y}L${d.target.x},${d.target.y}`;
            // }
        });

        node.attr('cx', d => d.x).attr('cy', d => d.y);
        label.attr('x', d => d.x).attr('y', d => d.y - 25); // Position label above node
    });

    // Drag functions
    function drag(simulation) {
        function dragstarted(event, d) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(event, d) {
            d.fx = event.x;
            d.fy = event.y;
        }

        function dragended(event, d) {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }

        return d3.drag()
            .on('start', dragstarted)
            .on('drag', dragged)
            .on('end', dragended);
    }
}

function clearGraph() {
    // Remove all SVG elements from the canvas
    d3.select('.canvas-section').selectAll('*').remove();
}