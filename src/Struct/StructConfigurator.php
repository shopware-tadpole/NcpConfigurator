<?php
declare(strict_types=1);

namespace ncp\Configurator\Struct;

use Shopware\Core\Framework\Struct\Struct;

class StructConfigurator extends Struct
{

    /*
        "data" enthält die Datenstrukturen aus den Basic-Tabellen speziell für das ausgewählte Product
        
        Systematischer Aufbau:
        
            $data = [
                "ProjectGroup" => [
                    "Name" => "Balcony railings",                         
                    "Product" => "Paris",
                    ]
            ]
            
            
            $data = [
                "ProjectGroup" => [
                    "Name" => "Balcony railings",
                    "Product" => "Paris",
                    
                    "Variantsn" => 
                        [
                            ["Name" => "hot-dip galvanized"],
                            ["Name" => "stainless steel"],
                        ]
                ]
            ]
            
            
        
            $data = [
                "ProjectGroup" => [
                    "Name" => "Balcony railings",
                    "Product" => "Paris",
                    
                    "Variantsn" => [
                        [
                            "Name" => "hot-dip galvanized",
                            
                            "Preisfaktor" => 1.2,
                            
                            "Dimensionen" => [
                                "Name" => "Width"
                                "Dimensionen" => [
                                    "min": 1000,
                                    "max": 2000
                                ]
                            ],
                                
                            [
                                "Name" => "Height",
                                "Dimensionen" => [
                                    "min": 1000,
                                    "max": 1000
                                ]
                            ],
                        ],
                            
                        [
                            "Name" => "stainless steel"
                            
                            etc.
                        ],
                    ]
                ]
            ]
     */
    public array $data = [];
}
