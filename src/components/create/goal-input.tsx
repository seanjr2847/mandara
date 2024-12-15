import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface GoalInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function GoalInput({ label, value, onChange, placeholder }: GoalInputProps) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-20 resize-none p-4 text-lg"
      />
    </div>
  );
}
