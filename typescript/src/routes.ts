import { Request, Response } from "express";
import CreateCourseService from "./CreateCourseService";

export function createCourse(req: Request, res: Response) {
   CreateCourseService.execute({
      name: "NodeJS",
      educator: "Dani",
      duration: 10,
   });

   CreateCourseService.execute({
      name: "React",
      educator: "Diego",
   });

   return res.send();
}
