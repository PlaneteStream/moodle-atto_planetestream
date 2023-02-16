<?php
// …

namespace atto_planetestream\privacy;

class provider {

public static function get_metadata(collection $collection): collection {
    $collection->add_external_location_link('atto_planetestream', [
            'userid' => 'privacy:metadata:atto_planetestream:userid',            
		    'email' => 'privacy:metadata:atto_planetestream:email',
            'userip' => 'privacy:metadata:atto_planetestream:userip',
        ], 'privacy:metadata:atto_planetestream');

    return $collection;
}

}