export const EXAMPLE_ORDER = {
	"external_id": "4235234213",
	"shipping": "STANDARD",
	"recipient": {
	  "name": "John Smith",
	  "company": "John Smith Inc",
	  "address1": "19749 Dearborn St",
	  "address2": "string",
	  "city": "Chatsworth",
	  "state_code": "CA",
	  "state_name": "California",
	  "country_code": "US",
	  "country_name": "United States",
	  "zip": "91311",
	  "phone": "string",
	  "email": "string@example.com",
	  "tax_number": "123.456.789-10"
	},
	"items": [
	  {
		"id": 1,
		"external_id": "64b0fea9b4b591",
		"sync_variant_id": 3965775314,
		"external_variant_id": "variant-1",
		"quantity": 1,
		"price": "13.00",
		"retail_price": "13.00",
		"name": "Bella + Canvas 3001 Unisex Short Sleeve Jersey T-Shirt",
		"product": {
			"variant_id": 4011,
			"product_id": 71,
			"image": "https://files.cdn.printful.com/products/71/5309_1581412541.jpg",
			"name": "Bella + Canvas 3001 Unisex Short Sleeve Jersey T-Shirt with Tear Away Label (White / 4XL)"
		},
		"files": [
		  {
			"type": "default",
			"url": "https://cdn.discordapp.com/attachments/1123802169364197496/1127019399518355576/zzzzebraman_Hercules_shooting_a_rocket_launcher_Fauvism_style_a_c4a228ed-949e-4140-b0fb-8358ae0d1f56.png",
			"options": [
			  {
				"id": "template_type",
				"value": "native"
			  }
			],
			"filename": "shirt1.png",
			"visible": true,
			"position": {
			  "area_width": 1800,
			  "area_height": 2400,
			  "width": 1800,
			  "height": 1800,
			  "top": 300,
			  "left": 0,
			  "limit_to_print_area": true
			}
		  }
		],
		"options": [
		  {
			"id": "OptionKey",
			"value": "OptionValue"
		  }
		],
		"sku": null,
		"discontinued": true,
		"out_of_stock": true
	  }
	],
	"retail_costs": {
	  "currency": "USD",
	  "subtotal": "10.00",
	  "discount": "0.00",
	  "shipping": "5.00",
	  "tax": "0.00"
	},
	"gift": {
	  "subject": "To John",
	  "message": "Have a nice day"
	},
	"packing_slip": {}
}