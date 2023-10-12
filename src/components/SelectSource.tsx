import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type SelectSourceProps = {
  choices: {
    label: string;
    value: string;
  }[];
  handleSelectChange: (value: string) => void;
};

export function SelectSource({
  choices,
  handleSelectChange,
}: SelectSourceProps) {
  return (
    <Select onValueChange={handleSelectChange} defaultValue={choices[0].value}>
      <SelectTrigger className="w-[240px]">
        <SelectValue placeholder="Source" />
      </SelectTrigger>
      <SelectContent>
        {choices.map(choice => (
          <SelectItem value={choice.value}>{choice.label}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
