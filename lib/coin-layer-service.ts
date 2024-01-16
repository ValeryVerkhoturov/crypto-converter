import axios from "axios";

export function convert(from: string, to: string, amount: number) {
  return axios.get(`https://api.coinconvert.net/convert/${from.toLowerCase()}/${to.toLowerCase()}`, {
    params: {
      amount
    }
  }).then(res => res.data)
}
