import { serverService } from "@/services/server";
import { NextRequest } from "next/server";

export const GET = (req: NextRequest) =>
  serverService.lists.controller.dashboard(req);
