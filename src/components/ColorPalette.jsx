const colors = [
  "#FF6B6B",
  "#4D96FF",
  "#6BCB77",
  "#FFD93D",
  "#B983FF",
  "#FF9F1C",
  "#00C2A8",
  "#F15BB5",
  "#845EC2",
  "#2EC4B6",
  "#FF8066",
  "#3A86FF",
  "#8338EC",
  "#FF006E",
  "#06D6A0",
  "#118AB2",
  "#EF476F",
  "#073B4C",
  "#8AC926",
  "#FFCA3A",
];

function ColorPalette({
  size,
  selectedColor,
  setSelectedColor,
}) {
  return (
    <div className="palette">
      {Array.from({ length: size }, (_, index) => (
        <button
          key={index}
          className={`color-button ${
            selectedColor === index ? "selected" : ""
          }`}
          style={{ backgroundColor: colors[index] }}
          onClick={() => setSelectedColor(index)}
          aria-label={`Region ${index + 1}`}
        />
      ))}
    </div>
  );
}

export default ColorPalette;

export { colors };