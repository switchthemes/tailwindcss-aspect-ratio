const plugin = require("tailwindcss/plugin");

const baseStyles = {
  aspectRatio: "var(--tw-aspect-w) / var(--tw-aspect-h)",
};

const beforeStyles = {
  float: "left",
  content: "''",
  paddingTop: `calc(var(--tw-aspect-h) / var(--tw-aspect-w) * 100%)`,
};

const afterStyles = {
  display: "block",
  content: "",
  clear: "both",
};

const aspectRatio = plugin(
  function ({ addComponents, matchComponents, theme, variants, e }) {
    const values = theme("aspectRatio");

    if (matchComponents) {
      matchComponents(
        {
          "aspect-w": (value) => [
            {
              ...baseStyles,
              "--tw-aspect-w": value,
            },
          ],
          "aspect-h": (value) => ({ "--tw-aspect-h": value }),
        },
        { values }
      );

      return;
    }

    const baseSelectors = Object.entries(values)
      .map(([key, value]) => {
        return `.${e(`aspect-w-${key}`)}`;
      })
      .join(",\n");

    const beforeSelectors = Object.entries(values)
      .map(([key, value]) => {
        return `.${e(`aspect-w-${key}`)}::before`;
      })
      .join(",\n");

    const afterSelectors = Object.entries(values)
      .map(([key, value]) => {
        return `.${e(`aspect-w-${key}`)}::after`;
      })
      .join(",\n");

    addComponents(
      [
        {
          [baseSelectors]: baseStyles,
          "@supports not (aspect-ratio: 1 / 1)": {
            [beforeSelectors]: beforeStyles,
            [afterSelectors]: afterStyles,
          },
        },
        Object.entries(values).map(([key, value]) => {
          return {
            [`.${e(`aspect-w-${key}`)}`]: {
              "--tw-aspect-w": value,
            },
          };
        }),
        Object.entries(values).map(([key, value]) => {
          return {
            [`.${e(`aspect-h-${key}`)}`]: {
              "--tw-aspect-h": value,
            },
          };
        }),
      ],
      variants("aspectRatio")
    );
  },
  {
    theme: {
      aspectRatio: {
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
        6: "6",
        7: "7",
        8: "8",
        9: "9",
        10: "10",
        11: "11",
        12: "12",
        13: "13",
        14: "14",
        15: "15",
        16: "16",
      },
    },
    variants: {
      aspectRatio: ["responsive"],
    },
  }
);

module.exports = aspectRatio;
