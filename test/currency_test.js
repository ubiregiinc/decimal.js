var CurrencyTestCase = new YAHOO.tool.TestCase({
    name: "Currency",
    
    testIntegralPart: function() {
        Assert.areEqual("$100.00", Currency.fromNumber(100,"USD"));
        Assert.areEqual("$1,000.00", Currency.fromNumber(1000,"USD"));
        Assert.areEqual("$1,000,000.00", Currency.fromNumber(1000000,"USD"));
        Assert.areEqual("-$100.00", Currency.fromNumber(-100,"USD"));
        Assert.areEqual("-$1,000.00", Currency.fromNumber(-1000,"USD"));
        Assert.areEqual("$0.00", Currency.fromNumber(0,"USD"));
    },

    testDecimalPart: function() {
        Assert.areEqual("$0.25", Currency.fromNumber(0.25, "USD").toString());
        Assert.areEqual("$0.25", Currency.fromNumber(0.258, "USD").toString());
        Assert.areEqual("$0.20", Currency.fromNumber(0.2, "USD").toString());
        Assert.areEqual("¥1", Currency.fromNumber(1.0, "JPY").toString());
        Assert.areEqual("¥1", Currency.fromNumber(1.3, "JPY").toString());
    },

    testDecimalPrecision: function() {
        Assert.areEqual("$0.0002", Currency.fromNumber(0.0002, "USD").toString({precision:null}));
        Assert.areEqual("¥1.3", Currency.fromNumber(1.3, "JPY").toString({precision:null}));
        Assert.areEqual("¤1 000.000", Currency.fromNumber(1000, "Unknown 3").toString());
    }
});

YAHOO.tool.TestRunner.add(CurrencyTestCase);

