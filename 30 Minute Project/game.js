function generateMatrix(shapeType) {
    let matrixArea = document.getElementById('matrixArea');
    matrixArea.innerHTML = ''; // Clear the main content

    let matrixSize = 5;  // 5x5 matrix for simplicity

    for (let i = 0; i < matrixSize * matrixSize; i++) {
        let shape = document.createElement('div');
        shape.classList.add('shape', shapeType);
        matrixArea.appendChild(shape);
    }
}