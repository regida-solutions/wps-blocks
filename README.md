# WPS BLOCKS
A set of gutenberg blocks for WordPress.
Contact info\
Grid\
Section\
Slider\
Image Slider (deprecated)\
Media Slider\
Whatsapp\
Card

### Requirements
NPM >= 18\
PHP >= 8\
Wordpress >= 6

### Installation
1. Clone this repo into your plugins directory
2. Run `npm install` to install all dependencies
3. Run `npm run build` to build the blocks

```npm install && npm run build```

### Note
In ``packages/components/compatibility/index.css``
are css definitions for spacing sizes & colors used in the blocks.\
The css properties contain fallback values and in order to match the current theme used by the website is possible to register in theme.json the values shown below, and then they will be used instead.\

### Example in theme.json
```json
"settings": {
	...,
	"color": {
		...,
		"palette": [
			{
				"color": "#ffffff",
				"name": "White",
				"slug": "base"
			},
			...,
		]
	},
	"spacing": {
		...,
		"spacingSizes": [
			{
				"name": "Reset",
				"slug": "reset",
				"size": "0"
			},
			{
				"name": "Tiny",
				"slug": "tiny",
				"size": "6px"
			},
			{
				"name": "Small",
				"slug": "small",
				"size": "12px"
			},
			{
				"name": "Normal",
				"slug": "normal",
				"size": "24px"
			},
			{
				"name": "Large",
				"slug": "large",
				"size": "60px"
			},
			{
				"name": "Huge",
				"slug": "huge",
				"size": "80px"
			}
		],
	}
}
```





