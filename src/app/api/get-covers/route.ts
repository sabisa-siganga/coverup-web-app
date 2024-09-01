import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import policies from "@/data/policies.json";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    let paymentRange = url.searchParams.get("paymentRange");
    const searchTerm = url.searchParams.get("searchTerm");

    let minPayment = 0;
    let maxPayment = Infinity;

    if (paymentRange) {
      const [min, max] = paymentRange.split("-").map((p) => p.trim());

      minPayment = parseInt(min.replace(/\D/g, ""), 10) || 0;
      maxPayment = max ? parseInt(max.replace(/\D/g, ""), 10) : Infinity;
    }

    const filteredPolicies = policies.filter((policy) => {
      const monthlyPay = parseInt(policy.monthlyPay.replace(/\D/g, ""), 10);
      const matchesPaymentRange =
        monthlyPay >= minPayment &&
        (maxPayment === Infinity || monthlyPay <= maxPayment);
      const matchesSearchTerm = searchTerm
        ? policy.name.toLowerCase().includes(searchTerm.toLowerCase())
        : true;
      return matchesPaymentRange && matchesSearchTerm;
    });

    return NextResponse.json({ policies: filteredPolicies });
  } catch (error) {
    console.error("Error handling search request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
