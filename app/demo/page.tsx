import type { Metadata } from "next";
import DemoApp from "@/components/demo/DemoApp";

export const metadata: Metadata = {
  title: "Interactive Demo — FieldsForTax",
  description: "Try every MVP feature: custom fields, templates, CSV sync, audit log, and bulk update.",
};

export default function DemoPage() {
  return <DemoApp />;
}
