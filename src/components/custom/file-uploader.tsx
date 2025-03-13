import { ChangeEvent, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Button } from "../ui/button";

const FileUploader = ({}) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setFile(file);
    }
  };
  return (
    <div>
      <div>
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </div>
      {file && (
        <Card className="mt-2 w-full ">
          <CardHeader>
            <h2 className="text-lg font-semibold">Preview Image</h2>
          </CardHeader>
          <CardContent>
            <img
              src={URL.createObjectURL(file)}
              alt="preview"
              className="w-auto h-36 object-cover"
            />
          </CardContent>
          <CardFooter>
            <Button
              variant="ghost"
              className="w-full"
              onClick={() => setFile(null)}
            >
              Remove
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default FileUploader;
