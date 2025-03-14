export const signup = async (req, res) => {
  try {
    res.json({
      success: true,
      message: "User created successfully",
      data: req.body,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    res.json({
      success: true,
      message: "User logged in successfully",
      data: req.body,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.json({
      success: true,
      message: "User logged out successfully",
      data: req.body,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
