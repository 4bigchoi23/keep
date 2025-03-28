// import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export default async function KeepForm() {
  return(
    <>
      <Card>
        <CardHeader>
          <CardTitle>Keep your bookmark!</CardTitle>
          <CardDescription>Keep your bookmark in one-click.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="url" className="sr-only">URL</Label>
                <Input id="url" placeholder="http:// or https://" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="title" className="sr-only">Title</Label>
                <Input id="title" placeholder="Title" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description" className="sr-only">Description</Label>
                <Input id="description" placeholder="Description" />
              </div>
              <div className="flex flex-col space-y-1.5 sr-only">
                <Label htmlFor="image" className="sr-only">Image</Label>
                <Input id="image" placeholder="Image" />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button>Submit <Badge className="bg-muted-foreground"><kbd>Alt</kbd> + <kbd>S</kbd></Badge></Button>
          <Button variant="outline">Reset</Button>
        </CardFooter>
      </Card>
    </>
  );
}
