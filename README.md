# NcpConfigurator
Shopware 6 Plugin - Product Configurator

According to the knowledge pyramid, at the top are simple truths that bring the lower truths (data) to a common denominator. The lower you go in the pyramid, the more complex the truths become and the less you see the big picture. In science, you work your way up from the bottom through iterative experiments, predictions, and verifications/falsifications, looking for simple formulas to explain the phenomena you discover. As a programmer, one should follow both directions in sync to find extraordinary solutions and ideas to map life in an elegant, simple way, while still accounting for any form of complexity.

I once had the task of creating a shopping cart for Bosch that had to have many different links between different objects. The more requirements were placed on the system, the more tables and relations had to be created using conventional methods, which made the program more and more complex. After three days of development, I stopped programming and sat down at my empty work table one evening. I forgot for a moment everything I had learned about databases and threw all the normalization rules overboard.

In front of me was only emptiness: the primal truth.

From here, from nowhere, I began to develop my data model. I put a cup on the table and looked at it for a while. What did I have there? My first truly empirical truth. I recognized its classification: it was a cup. It had characteristics as an object: a position in space, a time of its creation/destruction, a number (it was the first cup), you could give it a name, a more detailed description....

Then I put a spoon next to the cup. This new object also had a classification and the same characteristics with different content.
Another invisible truth automatically joined it: A connection between these two objects. They could have one or more relationships or none.
After adding more objects, I realized that I only needed four tables to describe any kind of complex, intertwined information! My code suddenly reduced to a handful of functions for data access and components for the front end. Individual additional information per class could be added as additional fields in the object table or defined as an external table if needed.

The four tables:
Class: ID, Name, {Description}
ClassConnection: ID, ClassFrom, ClassTo, Name, {Description}
Object: ID, class, name, {additional fields}
ObjectConnections: ID, ObjectFrom, ObjectTo, {additional fields}

This simplified structure made it possible to describe any object and its relationships with other objects. The code became simple and easy to understand, and the system was able to meet any kind of requirements without becoming too complex.

Based on this insight, I had the idea to develop a plugin for a product configurator based on the same simplified structure. The configurator allows users to create custom products with different options and features. By using this simplified structure, the configurator is fast, easy to understand and easy to extend. The configurator is built in such a way that it can be easily customized to support different products and options. It is possible to add new products and options without making the system more complex or sacrificing usability.

Finally, the configurator is also powerful. It is able to provide contextual information quickly and accurately without complicated SQL shortcuts.
I hope the text so far has given you an idea of how the product configurator works. If you have any further information or questions about the configurator, I'm happy to help.

necips@live.de
