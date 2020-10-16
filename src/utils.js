export const emitNavColor = (event, color, component) => {
  component.$emit(event, color);
}