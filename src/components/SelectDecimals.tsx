import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type SelectSourceProps = {
  choices: string[];
  handleDecimalChange: (value: string) => void;
};

export function SelectDecimals({
  choices,
  handleDecimalChange,
}: SelectSourceProps) {
  return (
    <Select onValueChange={handleDecimalChange} defaultValue={'4'}>
      <SelectTrigger className="w-[240px]">
        <SelectValue placeholder="Source" />
      </SelectTrigger>
      <SelectContent>
        {choices.map(choice => (
          <SelectItem value={choice}>{choice}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
