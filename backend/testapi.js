async function query() {
	const data = "https://res.cloudinary.com/duhho2j3z/image/upload/v1733838197/your_folder_name/j48jopiptxu1wohzq6qt.jpg";
	const data2 = "https://res.cloudinary.com/duhho2j3z/image/upload/v1733837986/your_folder_name/irp9y6s5ld2blsdv6z4q.jpg";
	const response = await fetch(
		"https://api-inference.huggingface.co/models/openai/clip-vit-large-patch14",
		{
			headers: {
				Authorization: "Bearer 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",
				"Content-Type": "application/json",
			},
			method: "POST",
			body: data2,
		}
	);
	const result = await response.json();
	console.log(result);
}

query()