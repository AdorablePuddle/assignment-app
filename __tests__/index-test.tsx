import { fireEvent, render, waitFor } from "@testing-library/react-native";

import Home from "@/src/app/(tabs)/index";

describe("<Home />", () => {
	// Basic Tests
	test("Step text rendering on Home screen", () => {
		const { getByText } = render(<Home />);
		getByText("Steps")
	});
	test("Start recording text rendering on Home screen", () => {
		const { getByText } = render(<Home />);
		getByText("Start Recording")
	});
	test("Start recording changes to stop recording when clicked on Home screen", async () => {
		const { getByText } = render(<Home />);
		const button = getByText("Start Recording");

		fireEvent.press(button);

		await waitFor(() => {
			expect(getByText("Stop Recording")).toBeTruthy();
		})
	});

	// Advanced Tests
	test("Advanced -- Step tracker stays 0 after a few seconds of immobilization", async () => {
		const { getByText } = render(<Home />);
		const button = getByText("Start Recording");

		fireEvent.press(button);

		await waitFor(() => {
			expect(getByText("0")).toBeOnTheScreen();
		}, { timeout : 2000 });
	})
})