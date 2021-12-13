module.exports = mongoose => {
  const Definition = mongoose.model(
    "definition",
    mongoose.Schema(
      {
        word: String,
        def: String,
        image: String
      },
      { timestamps: true }
    )
  );

  return Definition;
};