export const  currencyRow=(props)=>{

 const   {currencyOption,selectedCurrency,amount,onchangAmount,onchangeCurrency}=props;


 return(
     <>
          <div className='column'>
            <label> US
              <input value={amount}></input>
            </label>
            <form>
              <select value={selectedCurrency} onChange={onchangeCurrency}>
                {
                  currencyOption.map(option => (
                    <option key={option} value={option}>{option}</option>
                  )
                  )
                }
              </select>
            </form>

          </div>
     </>
 )

}