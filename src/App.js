import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEquals } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react';


const BASE_URL = 'https://api.apilayer.com/exchangerates_data/latest'
const myHeaders = new Headers();
myHeaders.append("apikey", "lN3LapaWHilKVm7QcwYCs4OXE4gAXBKQ");

const requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};
const defaultCurrency = "USD"
function App(props) {


  const [currencyOptions, setcurrencyOptions] = useState([])
  const [fromCurrency, setfromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState()
  const [exchangeRate, setExchangeRate] = useState()
  const [amount, setamount] = useState(1)
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)

  let fromAmount, toAmount
  if (amountInFromCurrency) {
    fromAmount = amount
    toAmount = amount * exchangeRate

  } else {
    toAmount = amount
    fromAmount = amount / exchangeRate;

  }





  const handleFromAmount = (event) => {
    console.log("event", event.target.value);
    setamount(event.target.value)
    setAmountInFromCurrency(true)

  }
  const handleToAmount = (event) => {
    console.log("event", event.target.value);
    setamount(event.target.value)
    setAmountInFromCurrency(false)

  }

  const {
    selectedCurrency,
    onChangeCurrency,
    onChangeAmount
    // amount
  } = props

  useEffect(() => {

    fetch(BASE_URL + "?base=" + defaultCurrency, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        let firstCurrency = Object.keys(result.rates)[0];
        console.log("firstCurrency", firstCurrency);
        console.log("firstCurrency", result.rates[firstCurrency]);
        setcurrencyOptions(Object.keys(result.rates))
        setfromCurrency(result.base)
        setToCurrency(firstCurrency)
        setExchangeRate(result.rates[firstCurrency])

      }

      )
      .catch(error => console.log('error', error));

  }, [])


  useEffect(() => {

    console.log("currency change");

    if (fromCurrency != null && toCurrency != null) {
      fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency} ` , requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result)
          setExchangeRate(result.rates[toCurrency])


        }

        )
        .catch(error => console.log('error', error));
    }

  }, [fromCurrency, toCurrency]
  )



  const convert = () => {
    console.log("convert");

    console.log("currencyOptions", currencyOptions);
  }



  return (


    <div className="App">

      <div className='conventer'>
        Current Converter

        <div className='row'>
          <div className='column'>
            <label> {fromCurrency}
              <input type='number' value={fromAmount} onChange={handleFromAmount}></input>
            </label>
            <form>
              <select value={selectedCurrency} onChange={e => setfromCurrency(e.target.value)}>
                {
                  currencyOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  )
                  )
                }
              </select>
            </form>

          </div>

          <div className='convent'>
            <FontAwesomeIcon icon={faEquals} onClick={convert} />
          </div>

          <div className='column'>

            <label> {toCurrency}
              <input type='number' value={toAmount} onChange={handleToAmount} ></input>
            </label>
            <form>
              <select value={selectedCurrency} onChange={e => setToCurrency(e.target.value)}>
                {
                  currencyOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  )
                  )
                }
              </select>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
