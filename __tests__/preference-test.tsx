import Preference from "@/src/app/(tabs)/preference";
import { render, screen } from "@testing-library/react-native";

describe("<Preference />", () => {
	test("Dark Mode switch is available." , () => {
		render(<Preference />);
		const toggleSwitch = screen.getByTestId("dark_mode_toggle");
		expect(toggleSwitch).not.toBeChecked();
	});
	test("Log Out button exists in its enabled state at the beginning.", () => {
		render(<Preference />);
		const logOutButton = screen.getByTestId("log_out_button");
		expect(logOutButton).not.toBeDisabled();
	})
})