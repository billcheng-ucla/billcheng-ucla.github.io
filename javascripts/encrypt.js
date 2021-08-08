function packetEncode(packet) 
{
	let packetBin = [];
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

function encode(data) 
{
	console.log("AEFDSF");
	let encoded = [];
	for(let i = 0; i < data.length; i++)
	{
		if(i % 4 === 0)
		{
			encoded.push([]);
		}
		encoded[encoded.length - 1].push(data[i]);
	}
	for(let i = 0; i < encoded.length; i++)
	{
		encoded[i] = packetEncode(encoded[i].join(""));
	}
	return encoded;
}

function packetDecode(encrytCode)
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

function decode(codeList)
{
	let original = '';
	for(const code of codeList)
	{
		original += packetDecode(code);
	}
	return original;
}

function cleanCodeList(rawCodeList)
{
	
	let cleanCodeList = rawCodeList.replace("[", "");
	cleanCodeList = cleanCodeList.replace("]", "");
	cleanCodeList = cleanCodeList.split(",");
	for(let i = 0; i < cleanCodeList.length; i++)
	{
		cleanCodeList[i] = cleanCodeList[i].trim();
	}
	return cleanCodeList;
}

$("#packet").change(() => {
	$("#encoded").text(`[${encode($("#packet").val()).toString().split(",").join(", ")}]`);
});

$("#code").change(() => {
	let cleanCodes = cleanCodeList($("#code").val());
	let NaNFound = false;
	for(let i = 0; i < cleanCodes.length; i++)
	{
		if(isNaN(cleanCodes[i])) 
		{
			NaNFound = true;
		}
		else
		{
			cleanCodes[i] = parseInt(cleanCodes[i]);
		}
	}
	if(NaNFound)
	{
		$("#original").text("Invalid Input");
	}
	else
	{
		$("#original").text(decode(cleanCodes));
	}
	
});


