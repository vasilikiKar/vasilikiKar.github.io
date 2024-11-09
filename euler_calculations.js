document.addEventListener('DOMContentLoaded', function () {
    var findEulerCycleButton = document.querySelector('.euler-actions .btn-secondary:nth-child(1)');
    findEulerCycleButton.addEventListener('click', function () {
        const canvas = document.getElementById('myCanvas');
        const context = canvas.getContext('2d');

        // Array to store read data points
        const readData = [];

        // Loop through the graph data points and extract pixel values
        graphData.forEach(point => {
            const pixel = context.getImageData(point.x, point.y, 1, 1).data;
            // Assuming the graph is drawn using black lines, check for non-black pixels
            if (pixel[0] !== 0 || pixel[1] !== 0 || pixel[2] !== 0) {
                readData.push({ x: point.x, y: point.y });
            }
        });

        // Log the read data to the console
        console.log('Read Graph Data:', readData);
        console.log(canvas.graphData)
        //     var eulerCycle = findEulerCycle();
        //     console.log('Euler Cycle:', eulerCycle);
        //     // You can further display or process the Euler cycle as needed
    });

    // function findEulerCycle() {
    //     var graph = getGraphFromCanvas(); // You may need to implement this function based on your existing code
    //     var eulerCycle = findEulerCycleAlgorithm(graph);
    //     return eulerCycle;
    // }

    // ... (any additional logic or functions related to Euler cycle finding)
});
