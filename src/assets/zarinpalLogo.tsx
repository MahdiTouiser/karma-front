import React, { useRef } from 'react'

const ZarinPalLogo: React.FC = () => {
  const zarinPalRef = useRef<HTMLDivElement>(null)

  function showZPTrust() {
    window.open('https://www.zarinpal.com/trustPage/' + window.location.hostname, undefined, 'width=450, height=600, scrollbars=no, resizable=no')
  }
  return (
    <>
      <style>
        {`
        #zarinpal {
          margin: auto;
        }
        #zarinpal img {
          width: 40px;
        }
      `}
      </style>
      <div id="zarinpal" ref={zarinPalRef}>
        <a onClick={showZPTrust} title="دروازه پرداخت معتبر">
          <img src="https://cdn.zarinpal.com/badges/trustLogo/1.svg" alt="دروازه پرداخت معتبر" />
        </a>
      </div>
    </>
  )
}

export default ZarinPalLogo
