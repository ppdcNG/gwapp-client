

String.prototype.trunc =
function (n, useWordBoundary) {
    if (this.length <= n) { return this; }
    var subString = this.substr(0, n - 1);
    return (useWordBoundary
        ? subString.substr(0, subString.lastIndexOf(' '))
        : subString) + "...";
};

export const currencyCodes  = {
    'NGN': "₦",
    'USD': "$",
    'GBP': "£",
    'EUR': "€"
}
export const currencyWord  = {
    'NGN': "naira",
    'USD': "dollars",
    'GBP': "pounds",
    'EUR': "euros"
}
export const currencySubWord  = {
    'NGN': "kobo",
    'USD': "cents",
    'GBP': "pence",
    'EUR': "cents"
}




// numToWords :: (Number a, String a) => a -> String
export const numToWords = s => {
    var th = ['','thousand','million', 'billion','trillion'];
		var dg = ['zero','one','two','three','four', 'five','six','seven','eight','nine'];
		var tn = ['ten','eleven','twelve','thirteen', 'fourteen','fifteen','sixteen', 'seventeen','eighteen','nineteen'];
		var tw = ['twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety']; 
		
		s = (s||'').toString(); s = s.replace(/[\, ]/g,''); if (s != parseFloat(s)) return 'not a number'; var x = s.indexOf('.'); if (x == -1) x = s.length; if (x > 15) return 'too big'; var n = s.split(''); var str = ''; var sk = 0; for (var i=0; i < x; i++) {if ((x-i)%3==2) {if (n[i] == '1') {str += tn[Number(n[i+1])] + ' '; i++; sk=1;} else if (n[i]!=0) {str += tw[n[i]-2] + ' ';sk=1;}} else if (n[i]!=0) {str += dg[n[i]] +' '; if ((x-i)%3==0) str += 'hundred ';sk=1;} if ((x-i)%3==1) {if (sk) str += th[(x-i-1)/3] + ' ';sk=0;}} if (x != s.length) {var y = s.length; str += 'point '; for (var i=x+1; i<y; i++) str += dg[n[i]] +' ';} return str.replace(/\s+/g,' ');
};


export const converNumtoWord = (number, currency)=>{
    let bits = ""+ parseFloat(number);
    bits = bits.split('.');
    console.log(bits);
    let firspart = "" + numToWords(parseInt(bits[0])) + currencyWord[currency];
    let seconpart = bits[1] ? ", " + numToWords(parseInt(bits[1])) + currencySubWord[currency]: "";

    return firspart + seconpart
}

export const total = (items)=>{
    let tots = 0;
    items.map((item)=>{
        tots += item.amount == ''? 0 : parseFloat(item.amount)
    })
    return tots.toFixed(2)
}


export const cloudURL = "http://localhost:5001/gwapp-dev/us-central1/";