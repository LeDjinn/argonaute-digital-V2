import { Mail, Phone, MapPin, DivideCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ClientCardProps } from "@/interfaces";

export default function ClientCard({ email, phone, address }: ClientCardProps) {
  return (
    <Card className="w-full max-w-md  bg-gray-900 text-gray-100 border-gray-700">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-gray-100">
          Client TOP-Turnover
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 bg-gray-800 rounded-b-lg">
      <div className="py-4"></div>
        <div className="flex items-center space-x-3">
          <Mail className="h-5 w-5 text-gray-400" />
          <span className="text-sm text-gray-300">{email}</span>
        </div>
        <div className="flex items-center space-x-3">
          <Phone className="h-5 w-5 text-gray-400" />
          <span className="text-sm text-gray-300">{phone}</span>
        </div>
        <div className="flex items-start space-x-3">
          <MapPin className="h-5 w-5 text-gray-400 mt-1" />
          <span className="text-sm text-gray-300">
            {address.map((line, index) => (
              <span key={index}>
                {line}
                {index < address.length - 1 && <br />}
              </span>
            ))}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
