import cors from "cors";
import trimmer from "../middleware/trimmer";
import { json } from "body-parser";

export function middleware(app: any) {
  app.use(json());
  app.use(cors());

  app.use(trimmer.all);
}
