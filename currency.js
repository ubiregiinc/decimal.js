var Currency = (function() {
    var currencies = {};
    
    return {
        register: function(name, format) {
            format.name = name;
            currencies[name] = format;
        },
        
        find: function(name) {
            return currencies[name];
        },
        
        create: function(number, format) {
            return {
                toString: function(option) {
                    if (option) {
                        if (option.precision !== undefined) {
                            format.precision = option.precision;
                        }
                        if (option.unit !== undefined) {
                            format.unit = option.unit;
                        }
                        if (option.separator !== undefined) {
                            format.separator = option.separator;
                        }
                        if (option.delimiter !== undefined) {
                            format.delimiter = option.delimiter;
                        }
                        if (option.format !== undefined) {
                            format.format = option.format;
                        }
                        if (option.negative_format !== undefined) {
                            format.negative_format = option.negative_format;
                        }
                    }
                    return (number >= 0 ? format.format : format.negative_format).replace("%u", format.unit).replace("%n", this.numberAsString(format));
                },
                
                numberAsString: function(format) {
                    var string = Math.abs(number).toString();
                    var cs = string.split('.');
                    
                    var n = cs[0] || "";
                    var m = cs[1] || "";
                    
                    var integral = "";
                    // Insert delimiters into integral part
                    var components = []
                    while (n.length > 3) {
                        components.unshift(n.substring(n.length - 3));
                        n = n.substring(0, n.length-3);
                    }
                    components.unshift(n);
                    integral = components.join(format.delimiter);
                    
                    // Coerece decimal part
                    var decimal = "";
                    if (format.precision !== null) {
                        while (m.length < format.precision) {
                            m = m + "0";
                        }
                        m = m.substring(0, format.precision);
                    }
                    if (m.length > 0) {
                        decimal = "." + m;
                    } else {
                        decimal = m;
                    }
                    
                    return integral + decimal;
                }
            };
        },

        fromNumber: function(number, name) {
            return this.create(number, this.find(name));
        }
    };
    
}());

Currency.register("JPY",
                  {
                      precision: 0,
                      unit: "¥",
                      separator: ".",
                      delimiter: ",",
                      format: "%u%n",
                      negative_format: "-%u%n",
                  });

Currency.register("USD",
                  {
                      precision: 2,
                      unit: "$",
                      separator: ".",
                      delimiter: ",",
                      format: "%u%n",
                      negative_format: "-%u%n",
                  });
Currency.register("CAD",
                  {
                      precision: 2,
                      unit: "$",
                      separator: ".",
                      delimiter: ",",
                      format: "%u%n",
                      negative_format: "-%u%n",
                  });
Currency.register("GBP",
                  {
                      precision: 2,
                      unit: "£",
                      separator: ".",
                      delimiter: ",",
                      format: "%u%n",
                      negative_format: "-%u%n",
                  });
Currency.register("EUR_FR",
                  {
                      precision: 2,
                      unit: "€",
                      separator: ",",
                      delimiter: " ",
                      format: "%u%n",
                      negative_format: "-%u%n",
                  });
Currency.register("EUR_DE",
                  {
                      precision: 2,
                      unit: "€",
                      separator: ",",
                      delimiter: ".",
                      format: "%u%n",
                      negative_format: "-%u%n",
                  });
Currency.register("Unknown 2",
                  {
                      precision: 2,
                      unit: "¤",
                      separator: ".",
                      delimiter: " ",
                      format: "%u%n",
                      negative_format: "-%u%n",
                  });
Currency.register("Unknown 3",
                  {
                      precision: 3,
                      unit: "¤",
                      separator: ".",
                      delimiter: " ",
                      format: "%u%n",
                      negative_format: "-%u%n",
                  });

