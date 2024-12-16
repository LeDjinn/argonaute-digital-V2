"use client";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ClientCardProps, TechCardProps } from "@/interfaces";
import { FileText, Layers, Download } from "lucide-react";
import { Button } from "../button";

export default function TechCard({
  description,
  techStack,
  fileName,
}: TechCardProps) {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = `/pdf/${fileName}`; // Ensure `fileName` is just the filename (e.g., "my-file.pdf")
    link.download = fileName; // Name for the downloaded file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="w-full   bg-gray-900 text-gray-100 border-gray-700">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-gray-100">
          Description du projet
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 bg-gray-800 rounded-b-lg">
        <div className="py-4"></div>
        <div className="flex items-start space-x-3">
          <FileText className="h-5 w-5 text-gray-400 mt-1" />
          <span className="text-sm text-gray-300">{description}</span>
        </div>
        <div className="flex items-start space-x-3">
          <Layers className="h-5 w-5 text-gray-400 mt-1" />
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech, index) => (
              <span
                key={index}
                className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Download className="h-5 w-5 text-gray-400" />
          <Button
            Button
            variant="outline"
            className="text-sm bg-gray-700 text-gray-300 h-12 hover:bg-gray-700 hover:text-gray-100"
            onClick={handleDownload}
          >
            Téléchargez - <span className="underline">{fileName}</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
