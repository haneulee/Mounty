import { Button } from "~/common/components/ui/button";
import { Textarea } from "~/common/components/ui/textarea";

interface ReplyInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
  placeholder?: string;
}

export function ReplyInput({
  value,
  onChange,
  onSubmit,
  onCancel,
  placeholder = "답글을 작성하세요...",
}: ReplyInputProps) {
  return (
    <div className="space-y-2">
      <Textarea
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-[100px]"
      />
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel}>
          취소
        </Button>
        <Button onClick={onSubmit}>답글 작성</Button>
      </div>
    </div>
  );
}
