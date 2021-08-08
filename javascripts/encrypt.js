function encode(packet) 
{
	let packetBin = []
	for(const char of packet) 
	{
		let binChar = char.charCodeAt().toString(2).padStart(8, '0');
		packetBin = [binChar].concat(packetBin);
	}

	for(let i = 0; i < (4 - packet.length); i++)
	{
		packetBin = ['00000000'].concat(packetBin);
	}
	packetBin = packetBin.join('').split("");
	let packetBinEncoded = new Array(32).fill('0');
	for(let i = 0; i < 4; i++)
	{
		for(let j = 0; j < 8; j++)
		{
			packetBinEncoded[4 * j + i] = packetBin[8 * i + j];
		}
	}
	packetBinEncoded = packetBinEncoded.join("");
	return parseInt(packetBinEncoded, 2);
}

function decode(encrytCode)
{
	let encrytCodeBin = encrytCode.toString(2).padStart(32, '0');
	encrytCodeBin = encrytCodeBin.split("");
	let originalBin = new Array(32).fill('0');
	for(let i = 0; i < 4; i++)
	{
		for(let j = 0; j < 8; j++)
		{
			originalBin[8 * i + j] = encrytCodeBin[4 * j + i];
		}
	};
	let originalBinChars = []
	let packet = "";
	for(let i = 0; i < 4; i++)
	{
		originalBinChars.push([])
		for(let j = 0; j < 8; j++)
		{
			originalBinChars[originalBinChars.length - 1].push(originalBin[8 * i + j]);
		}
		originalBinChars[originalBinChars.length - 1] = originalBinChars[originalBinChars.length - 1].join("");
		if(originalBinChars[originalBinChars.length - 1] !== "00000000"){
			packet = String.fromCharCode(parseInt(originalBinChars[originalBinChars.length - 1], 2)) + packet;
		}
	}
	return packet;
}

$("#packet").change(() => {
	$("#encoded").text(encode($("#packet").val()));
});

$("#code").change(() => {
	$("#original").text(decode(parseInt($("#code").val())));
});


console.log(encode('A') === 16777217)
console.log(encode('FRED') === 251792692)
console.log(encode(' :^)') === 79094888)
console.log(encode("foo") === 124807030)
console.log(encode(" foo") === 250662636)
console.log(encode("foot") === 267939702)
console.log(encode("BIRD") === 251930706)
console.log(encode("....") === 15794160)
console.log(encode("^^^^") === 252706800)
console.log(encode("Woot") === 266956663)
console.log(encode("no") === 53490482)

console.log(decode(16777217) === 'A')
console.log(decode(251792692) === 'FRED')
console.log(decode(79094888) === ' :^)')
console.log(decode(124807030) === "foo")
console.log(decode(250662636) === " foo")
console.log(decode(267939702) === "foot")
console.log(decode(251930706) === "BIRD")
console.log(decode(15794160) === "....")
console.log(decode(252706800) === "^^^^")
console.log(decode(266956663) === "Woot")
console.log(decode(53490482) === "no")
