import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Lock, Shield, CreditCard, Sparkles, Wallet } from "lucide-react";
import { useBookingTickets } from "@/contexts/BookingTicketsProvider";
import { Navigate, useNavigate } from "react-router-dom";

export interface PaymentFormData {
  paymentMethod: "card" | "meeza";
  cardName: string;
  cardNumber: string;
  expiryDate: string;
  cvc: string;
}

const PaymentForm = () => {
  const { totalTicketsPrice, selectedSeats, handleTickets } =
    useBookingTickets();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [animateIn, setAnimateIn] = useState<boolean>(false);
  const [paymentDetails, setPaymentInfo] = useState<PaymentFormData>({
    paymentMethod: "card",
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvc: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialized(true);
      setAnimateIn(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 flex items-center justify-center p-4">
        {/* Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-500"></div>
        </div>

        <Card className="w-full max-w-md bg-white/80 backdrop-blur-xl border-2 border-white/30 rounded-3xl shadow-2xl shadow-slate-900/15">
          <CardContent className="flex items-center justify-center p-12">
            <div className="text-center">
              <div className="relative mb-6">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-violet-200 border-t-violet-600 mx-auto"></div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-600/20 to-purple-600/20 blur-lg animate-pulse"></div>
              </div>
              <p className="text-slate-700 font-medium">
                Loading payment details...
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (totalTicketsPrice === 0) {
    console.error("Total price is 0, redirecting to event page");
    return <Navigate to={`/events`} replace />;
  }

  const handleInputChange = (field: keyof PaymentFormData, value: string) => {
    setPaymentInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCardNumberChange = (value: string) => {
    const formattedValue = value
      .replace(/\s/g, "")
      .replace(/(\d{4})/g, "$1 ")
      .trim()
      .slice(0, 19);
    handleInputChange("cardNumber", formattedValue);
  };

  const handleExpiryDateChange = (value: string) => {
    const formattedValue = value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "$1/$2")
      .slice(0, 5);
    handleInputChange("expiryDate", formattedValue);
  };

  const handleCvcChange = (value: string) => {
    const formattedValue = value.replace(/\D/g, "").slice(0, 4);
    handleInputChange("cvc", formattedValue);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      await handleTickets(paymentDetails);
      setPaymentInfo({
        paymentMethod: "card",
        cardName: "",
        cardNumber: "",
        expiryDate: "",
        cvc: "",
      });
      return navigate("/success");
    } catch (error) {
      console.error("Payment error:", (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 p-4 py-12 transition-all duration-1000 ${
        animateIn ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative">
        <Card
          className={`w-full mx-auto bg-white/70 backdrop-blur-xl border-2 border-white/20 rounded-3xl shadow-2xl shadow-slate-900/15 hover:scale-[1.01] hover:shadow-3xl hover:shadow-slate-900/20 transition-all duration-500 ${
            animateIn ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <CardHeader className="text-center p-8 pb-6">
            {/* Premium Header with Icons */}
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl shadow-lg">
                <CreditCard className="w-8 h-8 text-white" />
              </div>
            </div>

            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-slate-800 via-violet-800 to-slate-800 bg-clip-text text-transparent mb-2">
              Payment
            </CardTitle>

            {/* Enhanced Price Display */}
            <div className="relative mb-4">
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-2xl">
                <Sparkles className="w-5 h-5 text-emerald-600" />
                <span className="text-2xl font-bold text-emerald-700">
                  ${totalTicketsPrice}
                </span>
              </div>
            </div>

            <CardDescription className="text-slate-600 mb-2">
              Complete your purchase for
            </CardDescription>
            <CardDescription className="text-sm font-medium text-slate-700">
              Selected seats: {selectedSeats.length} seat
              {selectedSeats.length !== 1 ? "s" : ""}
            </CardDescription>
          </CardHeader>

          <CardContent className="p-8 pt-4">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Enhanced Payment Method Selection */}
              <div className="space-y-4">
                <Label className="text-lg font-bold flex items-center gap-2">
                  <Shield className="w-5 h-5 text-violet-600" />
                  Payment Method
                </Label>
                <RadioGroup
                  value={paymentDetails.paymentMethod}
                  onValueChange={(value: "card" | "meeza") =>
                    handleInputChange("paymentMethod", value)
                  }
                  className="grid grid-cols-2 gap-4"
                >
                  <div>
                    <RadioGroupItem
                      value="card"
                      id="card"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="card"
                      className="flex flex-col items-center justify-center p-6 bg-white/60 backdrop-blur-md border-2 border-white/30 rounded-2xl hover:bg-white/80 hover:border-violet-300/60 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl peer-data-[state=checked]:bg-gradient-to-r peer-data-[state=checked]:from-violet-50 peer-data-[state=checked]:to-purple-50 peer-data-[state=checked]:border-violet-400 peer-data-[state=checked]:shadow-violet-200/50"
                    >
                      <CreditCard className="w-6 h-6 mb-2 text-slate-700 peer-data-[state=checked]:text-violet-600" />
                      <span className="font-semibold">Credit Card</span>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem
                      value="meeza"
                      id="meeza"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="meeza"
                      className="flex flex-col items-center justify-center p-6 bg-white/60 backdrop-blur-md border-2 border-white/30 rounded-2xl hover:bg-white/80 hover:border-orange-300/60 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl peer-data-[state=checked]:bg-gradient-to-r peer-data-[state=checked]:from-orange-50 peer-data-[state=checked]:to-amber-50 peer-data-[state=checked]:border-orange-400 peer-data-[state=checked]:shadow-orange-200/50"
                    >
                      <Wallet className="w-6 h-6 mb-2 text-slate-700 peer-data-[state=checked]:text-orange-600" />
                      <span className="font-semibold">Meeza</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {paymentDetails.paymentMethod === "card" && (
                <div className="space-y-6 animate-in fade-in duration-500">
                  {/* Card Name */}
                  <div className="space-y-3">
                    <Label htmlFor="cardName">Name on Card</Label>
                    <Input
                      id="cardName"
                      placeholder="John Doe"
                      value={paymentDetails.cardName}
                      onChange={(e) =>
                        handleInputChange("cardName", e.target.value)
                      }
                      required
                    />
                  </div>

                  {/* Card Number */}
                  <div className="space-y-3">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={paymentDetails.cardNumber}
                      onChange={(e) => handleCardNumberChange(e.target.value)}
                      maxLength={19}
                      required
                    />
                  </div>

                  {/* Expiry Date and CVC */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <Input
                        id="expiryDate"
                        placeholder="MM/YY"
                        value={paymentDetails.expiryDate}
                        onChange={(e) => handleExpiryDateChange(e.target.value)}
                        maxLength={5}
                        required
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="cvc">CVC</Label>
                      <Input
                        id="cvc"
                        placeholder="123"
                        value={paymentDetails.cvc}
                        onChange={(e) => handleCvcChange(e.target.value)}
                        maxLength={4}
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentDetails.paymentMethod === "meeza" && (
                <div className="text-center py-12 animate-in fade-in duration-500">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-100 to-amber-100 rounded-2xl mb-4">
                    <Wallet className="w-8 h-8 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">
                    Pay with Meeza
                  </h3>
                  <p className="text-slate-600 font-medium mb-4">
                    You will be redirected to Meeza payment gateway to complete
                    your payment securely
                  </p>
                  <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                    <p className="text-sm text-orange-700">
                      ✓ Secure Egyptian payment method
                      <br />
                      ✓ Over 40 million Meeza cards accepted
                      <br />✓ Fast and reliable transactions
                    </p>
                  </div>
                </div>
              )}

              {/* Enhanced Submit Button */}
              <Button
                disabled={loading}
                type="submit"
                className="disabled:bg-zinc400 w-full h-14 text-lg font-bold"
                size="lg"
              >
                {loading ? (
                  <div className="flex items-center gap-3">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white"></div>
                    <span>Processing payment...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <Lock className="w-5 h-5" />
                    <span>Pay ${totalTicketsPrice}</span>
                  </div>
                )}
              </Button>

              {/* Enhanced Security Notice */}
              <div className="text-center p-4 bg-green-50/80 backdrop-blur-md border border-green-200/60 rounded-2xl">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-semibold text-green-700">
                    Secure Payment
                  </span>
                </div>
                <p className="text-xs text-green-600">
                  Your payment details are encrypted and secure
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentForm;
