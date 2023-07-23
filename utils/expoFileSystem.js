import * as FileSystem from 'expo-file-system';

export const getDirectoryUri = () => {
	const directoryUri = FileSystem.documentDirectory;
};
export const readFile = async (fileName) => {
	let fileContet = "";
	// 채팅 directory 경로
	const directoryUri = FileSystem.documentDirectory + 'HDUO';
  
	// 파일 경로 지정
	let fileUri = `${directoryUri}/${fileName}`;
	
	// 파일 읽기 전 파일이 존재하는지 확인
	const directoryInfo = await FileSystem.getInfoAsync(directoryUri);
	const fileInfo = await FileSystem.getInfoAsync(fileUri);
  
	if (!directoryInfo.exists) {
	  // 폴더가 없으면 만들고 파일도 없을꺼니까 파일도 만들어
	  await FileSystem.makeDirectoryAsync(directoryUri);
	  await FileSystem.writeAsStringAsync(fileUri, '', { encoding: FileSystem.EncodingType.UTF8 });
  
	  fileContet = await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.UTF8 });
	} else {
  
	  if (fileInfo.exists) { // 파일이 존재하면 파일 읽어오고
		fileContet = await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.UTF8 });
		
	  } else {
		await FileSystem.writeAsStringAsync(fileUri, '', { encoding: FileSystem.EncodingType.UTF8 });
  
		fileContet = await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.UTF8 });
	  }
	}
	return fileContet;
};

export const createFile = async (fileName, fileItem) => {
	// 채팅 directory 경로
	const directoryUri = FileSystem.documentDirectory + 'HDUO';
	let fileUri =  `${directoryUri}/${fileName}`;
	
	// 파일 생성
	await FileSystem.writeAsStringAsync(fileUri, fileItem, { encoding: FileSystem.EncodingType.UTF8 });
	
};

export const deleteFile = async (fileName) => {

};