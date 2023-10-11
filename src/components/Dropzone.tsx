import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export type DropzoneProps = {
  id: string;
  title: string;
  description: string;
  path?: string;
  dropHandler: React.DragEventHandler;
};

export default function Dropzone({
  id,
  title,
  description,
  path,
  dropHandler,
}: DropzoneProps) {
  function handleDragOver(event: React.DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }
  return (
    <Card className="my-8">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent
        className="flex justify-center items-center w-72 h-36 bg-gray-100 text-xl font-medium"
        onDrop={dropHandler}
        onDragOver={handleDragOver}
        id={id}
      >
        <p>{path}</p>
      </CardContent>
    </Card>
  );
}
