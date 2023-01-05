# NcpConfigurator
Shopware 6 Plugin - Product Configurator


The special thing about my solution is that the configurator only needs four tables. In principle, a mind map is stored, which can define several relations to the same nodes.

We have a set of classes, and each of these classes can have a variety of relationships to another or the same class. These two tables define the logic behind the given classes.

The other two tables define the available objects and object relations.

The specific information about classes are stored as additional fields in the object or object connection tables. Thus, a complete administration or frontend can be built with only a few Vue components.

