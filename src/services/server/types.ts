import { NextResponse } from "next/server";
import { ZodIssue } from "zod";

export type BackendErrorResponse = NextResponse<{
  message: string;
  errors?: ZodIssue[];
}>;
