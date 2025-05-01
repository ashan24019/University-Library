import { HexColorInput, HexColorPicker } from "react-colorful";

interface Props {
  value?: string;
  onPickerChange: (color: string) => void;
}

const ColorPicker = ({ value, onPickerChange }: Props) => {
  return (
    <div className="relative">
        <div className="flex flex-row items-center">
            <p>#</p>
        <HexColorPicker color={value} onChange={onPickerChange} />
        <HexColorInput color={value} onChange={onPickerChange} className="hex-input"/>
        </div>
      
    </div>
  );
};

export default ColorPicker;
