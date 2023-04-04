import QRCode from 'qrcode'

import { useEffect, useState } from 'react'

export function QRCodeDisplayer() {

    const [qrcode, setQRCode] = useState<string | undefined>(undefined);

    useEffect(() => {
        QRCode.toDataURL(window.location.href)
        .then(url => {
          setQRCode(url)
        })
        .catch(err => {
          console.error(err)
        })
      }, []);

      if(qrcode !== undefined){
        return (
            <div>
                <img src={qrcode}></img>
            </div>
        )
      }else{
        return <div></div>
      }

}