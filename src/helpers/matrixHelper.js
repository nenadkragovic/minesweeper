export function createMatrix(width, height, defaultValue) {
    const matrix = [];
  
    for (let row = 0; row < height; row++) {
      const rowArray = [];
  
      for (let col = 0; col < width; col++) {
        rowArray.push(defaultValue);
      }
  
      matrix.push(rowArray);
    }
  
    return matrix;
}