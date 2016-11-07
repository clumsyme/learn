const sudokus = {
	'veryeasy':	["EHF32GD9AGB1ID53F89DC68A7BE1EDGIFH3BH721C495FC6IBEHAG4BC5H19FD74A75FC2HIF9HD72EAC",
					  "EH6CB7D9AG2A9DE3FH94CFH1GBEA547I6H3BHGB1C4IEFC6I2E817DBCE8AIF47DA7EF3B8IF9H4GB5AC",
					  "5H6C2GD9AGBAIDE36HI43F8AGB515DG96HCBHGBACDIEFCFI25HA742CEH1I64GD17EFCBHIF9HD7B5A3",
					  "EHFCB7DI1721IDEC689D3FHA7BEAED79FH3BHG21C49EFC6IB58AGDBC5HAI6D741GEFC2896IH4GBEAC",
					  "EH632GDIAGB1ID536H94C6HAGBEAE4GIFHCB87B134I56CFIBEH1GDBCEHA9F47D175FC2HIFIHD725AC",
					  "EH6C27D9AGB1IDE3F8I4CF8AG2E154GIFHC28GBACDIE63FIBEH174B3EH1IF4G4A7EFC2HIF9H47B5AC",
					  "EHFC2GD91GBAID53F89DC6H1G2EA5DG9683BHGB134IEFC6925HA7DB3E8A9FD74A75FCBHI69HD7BEAC",
					  "EHFCB74I1G219D5C6H9D3FHA7BEAED7I68CBHGBA3DIEFCF92E8AGDBC5HAI6D7D1G5F328I6I84GBEAC"]
	,		
	'easy':			["FAI82CGED7EH9DAF3BDB36G5AHI5D1BIFHG32H6ECG9D19CGDAH2F5CFE1H94BGA7BCF4EI8HIDG52CAF",
					  "FAIHB3GEDG5H94A63B4BC67EAH9E4A2IFH7CB86E3G94AI3GDA8B6E3FEA89DB7A72C64E9HHID7EBCAF",
					  "6A9HBC7E4GEH9DA63BDBCF7EA8954AB96H73BHFE3GIDA93G41HB6536EA8IDBGA72CF4EIH8I4GEB3A6",
					  "FAIH2CGE475H9DAFC24B3FG5AH9E4A2IF8G3BHFECGIDA9C7DA8B6E3FE1HI4B71GBCF4E988IDG5BCAF",
					  "F1IHB37EDGEH94AFCB42CFG5A895D12IFHGCBHF5C7IDAICGDA82F536E1HID27AGBC64EIHHI47EBC1F",
					  "71HC4FI52FE97BAHCDCDBHI5GAF9F41H2E73H37I5D62A12E6G34H9BGA4FHCIEDICEA72FH58FB3IA47",
					  "7AHCD69EBFEI721HCD3D2HIEGAFI64AH2EGCHC79546BAABE6GC48IBGADFH3I5DIC517BFHEH62CIAD7",
					  "GAHC4F9EBF5I721HC4CDBHIEG16I64AH25GCHC79E46BAAB56GC48I27ADFHCIE4IC517B6HEH6B3IADG"]
	,	
	'medium':		["E8FC2GDIA7B1ID5C6HID3FH1GB5A547I6HCBHGBA3DIEFCFI2E817D2CE8AI6DGD1G5FC2H9FIHD7BE1C",
					  "E86CB74IA7BAIDE3FH9DC6HAGBE15D7IF8C2H7BA3DI5F3F9BE8A74BCEHA9FD7DA7EFCBH9FI84GB51C",
					  "5HFC2G4IA72AIDEC6HID3F8AG251EDGI6HCBH7BA3DI5FCFI2EHAG423EH1I6DGD1GEFCB89FI8D7BEA3",
					  "EH63BG4IA7BAI4EC6H9DCFHAG25AEDG9F8CBHG21349EFCF9B5HAGD23EHAIFD7D1GE6CBH9FI8DG25AC",
					  "EHF3BG4IAG21ID5C689DC6HA7BE1ED7IF8CB87BACDI56CF9BE8AG4BC5HA9FD741G5FC28IFI8DG2EAC",
					  "EHF32GDI17B1IDECF8I4CF8AGB5AEDG9F83BHGB1C4IEFC69B5HAGD2CEH1IF4G4AGEFC2H96IHD72EAC",
					  "EHFC27D9AG2A9DEC6HIDC6817BE1E4GIFHC2HG2ACD9EF3FIBEH1G4BC5819FDGD1GEF3B8IF9H47BEAC",
					  "5HF3BG4I1G2AIDECF8IDC6HAGBE1E47IFHC28GBA3DIE63FIBE81G4BCEHA9FDG4AGEFCB8I6I8DG2EA3",
					  "E8FC2G4IA7BAIDEC68I43FH17BEAEDGIF832HGBACDIEF369BEHAGDBC58AI64G41GEFCBH9FI8D7BE1C"]
	,
	'tough':		["58FCB74IAGBAID5CF8I4C6817B5AEDGIF8CBH72A3D95FCF9BEHAGD2C5819F4G4AG5FCBHIFI84GBE13",
					  "EH6CB7DI1GBAI4ECF89D3F81G2EAE4GIFHC2H72A3D95F3FIBEH1GDB3E81I6D74AGE6CBHI6IH4GB5AC",
					  "EHFC2GD9A7BA9D5C6H9DC6817B5AE47I6HCB87BACDI56CFI2E81GD2C5819FD7D1G5F3BH9F9HD7BEAC",
					  "E86CB7D91G2AID53FHIDC6HAG2E1EDGI68CBHGBACDIEFCF92EHAG4B3EHA9FDGDA75FCB8I69H4GB51C",
					  "E8FCB7DI1GBA9DE3F89DC68AG2EAE47IFH3BHGB1C4IEFC6IBE81GDB3EH19FD74A7EF3BHI6IH4GBE1C",
					  "5H63B7D9AG2A945CF8IDCFHAGBE15DGI6HC2HGBA3DIEF3FI2EHA74BCEHAIFDG4AG563B8IF9H4G25A3",
					  "EHFCB749A721IDECF8IDC6HA725A5D7IF8C2HGBA3DIEF3F9BE8A7D235HA9FDG4AGEFC289F984GBEAC"]
	,
	'verytough':	["6E2CAHGDID9C5G6HB118GB9DCFEIBAF475CH3GEIHBDA6HF415CIGBEDIG6AB832AH4C9F5GGCFHBE1I4",
					  "F5BC1HGD9D935GFH2A1HG2I4CFEI2AFDG5CH3GEI8BDA6HF4AECI7BEDI7F1BH3B1HDC965G7CFH2EA9D",
					  "EH6CB74IA7BAI4ECFHIDC6HAGB51E47IFH32HG21349EF36IBE81G42CEHA9FDGDAGE6CBH9FI84GB5AC",
					  "EH6CB7DIAG2AIDE36HI4CF8A72EAE47IF83B8GBA3DIE6C69BE81GDB35H1IF4GD17EFCB8IFIH4GB5AC",
					  "EH63BGDIA72AI4ECFH9D36HAGB5AE4GIFH32H7B1C4I5F36IBEH1GD2CEHA96D7DAGE6CB89FIHDG25AC",
					  "EH63BGD9AG21ID53FH9D3FH1GBEAE4G9FHC2HGB1C4IEF3FIB5H1GDBCE8AI6D7DA75FC28IF9HDG25AC",
					  "5HF3BGDIA7BAID5C6894CFH17B51EDG9F8C2HGBACDIEF3F9B5HAG42C58AIF4741G5FCBH9FIHDG2EA3"]
	,
	'extreme':		["5HFC2G4IAG2AIDE36H9D3FH172EAEDG9F83BHGB134IEFC69B5HAGDB358AI6D7D17EFCB8IFI8D7BEA3",
					  "E86CB7DI1G2AI45CFH9D36HAGBEAE4GIF8CB87BA3DI56CF9BEH1GDBCEHA96D7DAG56CB8I6IH4GB51C",
					  "EH63BGDIA72194ECFHI4CF81GBEAE4GIFHC28GB1C4IE63FIBEH1GDBCE81IF4GDAGE63289FIHDG25AC",
					  "5HF3BGDI1G2AI4E36HID3F8A7BEA5DGIF8CB8GB134IE6CF9BEHA7DBC5H1I6DGD17E6CB8I6IHDG2EA3",
					  "5HFC27DIAGB1IDE36H9DC6HAGB5AE47IF83BHGBA3DIEFC69BE81GD2CEHA9FD7D17EFC2HIFIH47BEA3",
					  "EHFCB7D9AG21IDECFH9D3FH1GBEA54G9FHCB8GB1C4IE6CFIB5H17DBCE8AI6D7DAGEFC28IF9H4GBEAC",
					  "5H6CB7DI1G21I4ECFHID3FH17B5A54GIFHCB8GBA3DIE6CFIBEH17D2C58AI6DGDAGE6C28I6IH4GB5A3"]
	,
	'hell':         ['AD53BGFIH8CIFEDA2GF7BI1H5DC4IFAH53GBB1HD7CIE6GE32IFD8AC6G5DBHA9IH4GFAB3EEBAHC97FD']
}
export default sudokus