export const setArticleHtml = ( cssSrcList: string[], jsSrcList: string[], body: string ) => {
  let cssLink = '';
  cssSrcList.forEach( item => {
    cssLink += `\n<link rel="stylesheet" href="${item}">`;
  } );
  let jsLink = '';
  jsSrcList.forEach( item => {
    jsLink += `<script src="${item}"></script>`;
  } );
  return `
		<html>
			<head>
			  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
				${cssLink}
				<style>
          .headline {
              display: none;
          }
        </style>
			</head>
			<body>
				${body}
				${jsLink}
			</body>
		</html>
		`;
};
