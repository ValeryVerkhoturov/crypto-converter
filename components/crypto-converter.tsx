"use client"

import { Label } from "@/components/ui/label"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ReloadIcon } from "@radix-ui/react-icons"
import {ConverterForm, Currency} from "@/types/converter-form";
import React, {useState} from "react";
import {convert} from "@/lib/coin-layer-service";

export function CryptoConverter() {
  const [converterForm, setConverterForm] = useState<ConverterForm>({
    from: "ETH",
    to: "BTC",
    amount: 10,
  })
  const [loading, setLoading] = useState(false)

  const handleFromChange = (value: Currency) => {
    setConverterForm(prevState => ({ ...prevState, from: value }))
  }

  const handleToChange = (value: Currency) => {
    setConverterForm(prevState => ({ ...prevState, to: value }))
  }

  const handleAmountChange = (event: React.FormEvent<HTMLInputElement> | undefined) => {
    const value = parseFloat(event?.currentTarget.value as unknown as string)
    if (!isFinite(value) || value < 0) return
    setConverterForm(prevState => ({ ...prevState, amount: value }))
  }

  const submitConvert = () => {
    if (converterForm.from === converterForm.to) {
      setConverterForm(prevState =>
          ({ ...prevState, result: prevState.amount})
      )
      return
    }
    if (converterForm.amount === 0) {
      setConverterForm(prevState =>
          ({ ...prevState, result: 0})
      )
      return
    }
    setLoading(true)
    convert(converterForm.from, converterForm.to, converterForm.amount)
        .then(res =>
            setConverterForm(prevState =>
                ({ ...prevState, result: res[prevState.to]})
            )
        )
        .catch(() =>
            setConverterForm(prevState =>
                ({ ...prevState, result: undefined})
            )
        )
        .finally(() => {
          setTimeout(() => setLoading(false), 2000)
        })
  }

  return (
    <div key="1" className="flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <h1 className="mb-4 text-3xl font-bold text-gray-800 dark:text-gray-200">Crypto Converter</h1>
      <div className="w-full max-w-md px-4 md:px-0">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="from">From</Label>
            <Select defaultValue={converterForm.from}
                    onValueChange={handleFromChange}>
              <SelectTrigger aria-label="From" id="from"
              >
                <SelectValue placeholder="Select a currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="BTC">BTC</SelectItem>
                <SelectItem value="ETH">ETH</SelectItem>
                <SelectItem value="USDT">USDT</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="to">To</Label>
            <Select defaultValue={converterForm.to}
                    onValueChange={handleToChange}>
              <SelectTrigger aria-label="To" id="to"
              >
                <SelectValue placeholder="Select a currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="BTC">BTC</SelectItem>
                <SelectItem value="ETH">ETH</SelectItem>
                <SelectItem value="USDT">USDT</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input id="amount" placeholder="Enter amount" type="number" min="0" step="any"
                   value={converterForm.amount} onChange={handleAmountChange} />
          </div>
          <Button className="w-full" type="submit" onClick={submitConvert} disabled={loading}>
            {!loading ? "Convert" : <>
              <ReloadIcon className="mr-2 size-4 animate-spin" />
              Please wait
            </>}
          </Button>
          <div className="space-y-2">
            <Label htmlFor="output">Output</Label>
            <Input disabled id="output" placeholder="Converted amount" type="number"
                   value={converterForm.result}/>
          </div>
        </div>
      </div>
    </div>
  )
}
