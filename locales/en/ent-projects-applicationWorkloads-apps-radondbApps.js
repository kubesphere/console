/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // List
  RADONDB_APPS: 'RadonDB Apps',
  RADONDB_APPS_DESC:
    'The RadonDB database apps covers relational databases, distributed databases, time series and analytical databases, and enterprise-grade databases and services such as NoSQL.',
  ACCESS_ADDRESS_PL: 'Access Addresses',
  DATABASE_STATUS_FAILED: 'Failed',
  DATABASE_STATUS_RUNNING: 'Running',
  DATABASE_STATUS_UPDATING: 'Updating',
  DATABASE_STATUS_CREATING: 'Creating',
  DATABASE_STATUS_TRUE_NOTREADY: 'Not ready',
  DATABASE_STATUS_TRUE_READY: 'Ready',
  // Details > Attributes
  READ_ADDRESS: 'Read Address',
  WRITE_ADDRESS: 'Write Address',
  READ_AND_WRITE_ADDRESS: 'Read and Write Address',
  KIBANA_ADDRESS: 'Kibana Address',
  // Details > More > Expand Volume
  DATABASE_OPERATION_WARNING:
    'This operation may interrupt the database service. Please perform this operation during off-peak hours.',
  VOLUME: 'Volume',
  NODE_ROLE: 'Node Role',
  CANNOT_REDUCE_VOLUME_SIZE: 'The volume size cannot be reduced.',
  // Details > More > Scale Out
  SCALE_OUT: 'Scale Out',
  CANNOT_REDUCE_DATABASE_NODES: 'The number of database nodes cannot be reduced.',
  MYSQL_NODES_DESC: 'Number of database nodes. The value can be 2, 3, or 5.',
  REDIS_SENTINEL_NODES_DESC: 'Number of database nodes. The value can be 3, 5, or 7.',
  MONGODB_NODES_DESC: 'Number of database nodes.',
  NODE_COUNT_DESC: 'Number of database nodes. The value range is {min} to {max}.',
  // Details > More > Adjust Resources
  ADJUST_RESOURCES: 'Adjust Resources',
  RESOURCES: 'Resources',
  RESOURCES_DESC: 'Set the CPU and memory resources allocated to the database services.',
  CORE_GIB: '{core, plural, =1 {1 core} other {# cores}}, {gib} GiB',
  // Details > More > Back Up
  BACK_UP: 'Back Up',
  BACKUP_NAME_DESC:
    'The name can contain only lowercase letters, numbers, and hyphens (-), and must start with a lowercase letter. The maximum length is 24 characters.',
  INVALID_BACKUP_NAME_DESC:
    'Invalid name. The name can contain only lowercase letters, numbers, and hyphens (-), and must start with a lowercase letter. The maximum length is 24 characters.',
  BACKUP_NAME_EMPTY_DESC: 'Please enter a backup name.',
  BACKUP_WARNING:
    'The backup process may cause pressure on database services. Please perform this operation during off-peak hours.',
  BACKUP_COMFIRM_TIP: 'Are you sure you want to create a backup?',
  // Details > More > Set Auto Backup
  SET_AUTO_BACKUP: 'Set Auto Backup',
  // Details > More > Create Topic
  TOPIC_NAME_DESC:
    'The name can contain only lowercase letters, numbers, and hyphens (-), and must start with a lowercase letter. The maximum length is 24 characters.',
  INVALID_TOPIC_NAME_DESC:
    'Invalid name. The name can contain only lowercase letters, numbers, and hyphens (-), and must start with a lowercase letter. The maximum length is 24 characters.',
  TOPIC_NAME_EMPTY_DESC: 'Please enter a topic name.',
  PARTITION_COUNT: 'Partitions',
  INVALID_PARTITION_COUNT_DESC: 'Invalid number of partitions. The value cannot exceed {max}.',
  TOPIC_REPLICA_COUNT_DESC:
    'The number of replicas cannot exceed the number of nodes in the database cluster.',
  CLEANUP_POLICY: 'Cleanup Policy',
  CLEANUP_POLICY_DESC:
    'Delete outdated logs or compress logs by key (Kafka Connect needs to use the compact mode).',
  COMPACT: 'Compact',
  // Details > Overview
  PRIMARY_NODE: 'Primary Node',
  PROXY_NODE: 'Proxy Node',
  NODE_IP_ADDRESS_SCAP: 'Node IP address',
  NODE_PORT: 'Node port',
  NO_DATABASE_CONNECTION_AVAILABLE: 'No Database Connection Available',
  DATABASE_CONNECTIONS: 'Database Connections',
  // Details > Rebalance Nodes
  POSTGRESQL_NODES_DESC: 'The value range is 1 to 8.',
  REBALANCE_SUCCESS: 'Rebalanced successfully.',
  REBALANCE_FAILED: 'Rebalancing failed.',
  REBALANCING: 'Rebalancing',
  // Details > Backups
  BACKUPS: 'Backups',
  BACKUP: 'Backup',
  BACKUP_LOW: 'backup',
  BACKUP_PL: 'Backups',
  RESTORE_FROM_BACKUP: 'Restore from Backup',
  BACKUP_IN_PROGRESS_DESC: 'Cluster backup is in progress.',
  SIZE_GIB: 'Size (GiB)',
  BACKUP_START_TIME: 'Backup Start Time',
  BACKUP_END_TIME: 'Backup End Time',
  CREATE_BACKUP: 'Create Backup',
  BACKUP_NOT_ALLOWED_DESC: 'The current cluster status does not allow data backup.',
  // Details > Database Users
  DATABASE_USERS: 'Database Users',
  KAFKA_USERS: 'Kafka Users',
  CANNOT_EDIT_ROOT_USER: 'This user is the root user and cannot be edited.',
  CANNOT_DELETE_ROOT_USER: 'This user is the root user and cannot be deleted.',
  SECRET_KEY: 'Secret Key',
  USER_CERTIFICATE: 'User Certificate',
  VALIDITY_PERIOD: 'Validity Period',
  CA_CERTIFICATE: 'CA Certificate',
  CA_PASSWORD: 'CA Password',
  AUTHORIZATION_RULE: 'Authorization Rule',
  NO_AUTHENTICATION_DESC:
    'The authentication mode of the database cluster is "No authentication" or "Plain". To access the database as a database user, please change the authentication mode in "Database Parameters".',
  KAFKA_NO_USER_DESC: 'Create a user to access Kafka.',
  // Details > Database Users > Create
  DATABASE_USERNAME_DESC:
    'The username can contain only uppercase letters, lowercase letters, numbers, and underscores (_), and must start with an uppercase or lowercase letter. The length must be 2 to 26 characters.',
  INVALID_DATABASE_USERNAME_DESC:
    'Invalid username. The username can contain only uppercase letters, lowercase letters, numbers, and underscores (_), and must start with an uppercase or lowercase letter. The length must be 2 to 26 characters.',
  PG_USERNAME_DESC:
    'The username can contain only lowercase letters, numbers, and hyphens (-), and must start with a lowercase letter. The length must be 2 to 26 characters.',
  INVALID_PG_USERNAME_DESC:
    'Invalid username. The username can contain only lowercase letters, numbers, and hyphens (-), and must start with a lowercase letter. The length must be 2 to 26 characters.',
  DATABASE_PASSWORD_DESC:
    'The password can contain only uppercase letters, lowercase letters, numbers, and special characters (!@#$%^&*_+-=). The length must be 8 to 32 characters.',
  INVALID_DATABASE_PASSWORD_DESC:
    'Invalid password. The password can contain only uppercase letters, lowercase letters, numbers, and special characters (! @ # $ % ^ & * _ + - =). The length must be 8 to 32 characters.',
  USERNAME_FORBIDDEN_STRINGS: 'The username cannot be root or start with radondb_.',
  USERNAME_CANNOT_BE_PROGRES: 'The username cannot be postgres.',
  KAFKA_USERNAME_DESC:
    'The username can contain only lowercase letters, numbers, and hyphens. The maximum length is 255 characters.',
  PERMISSIONS: 'Permissions',
  GENERAL_PERMISSIONS: 'General permissions',
  ADVANCED_PERMISSIONS: 'Advanced permissions',
  AUTHENTICATION_MODE: 'Authentication Method',
  AUTHENTICATION_MODE_INCORRECT_DESC:
    'The authentication mode is different from that of the database cluster. The user cannot access the database cluster.',
  AUTHORIZATION_MODE: 'Authorization Mode',
  SIMPLE_AUTHORIZATION: 'Simple authorization',
  AUTHORIZATION_MODE_DESC: 'Currently, only simple authorization is supported.',
  AUTHORIZED_DATABASES: 'Authorized Databases',
  AUTHORIZED_DATABASES_DESC:
    'Databases that the user can access. Enter * (all databases) or a database name.',
  AUTHORIZED_HOSTS: 'Authorized Hosts',
  AUTHORIZED_HOSTS_DESC:
    'Hosts that the user can access. Enter % (all hosts), an IP address, or multiple IP addresses separated by commas (,).',
  PERMISSION_RULE: 'Permission Rule',
  PERMISSION_RULE_DESC: 'You can add multiple permission rules for the user.',
  RESOURCE_TYPE_DESC: 'Resource type to which the rule applies.',
  RESOURCE_MATCHING_MODE: 'Resource Matching Mode',
  RESOURCE_MATCHING_MODE_DESC: 'Matching mode for resource names.',
  PREFIX: 'Prefix',
  LITERAL: 'Literal',
  OPERATION: 'Operation',
  OPERATION_DESC: 'Select an operation to which the rule applies.',
  DATABASE_OPERATION_READ: 'Read',
  DATABASE_OPERATION_READ: 'Read',
  DATABASE_OPERATION_WRITE: 'Write',
  DATABASE_OPERATION_DELETE: 'Delete',
  DATABASE_OPERATION_ALTER: 'Alter',
  DATABASE_OPERATION_DESCRIBE: 'Describe',
  DATABASE_OPERATION_ALL: 'All',
  DATABASE_OPERATION_IDEMPOTENTWRITE: 'Idle compoent write',
  DATABASE_OPERATION_CLUSTERACTION: 'Cluster action',
  DATABASE_OPERATION_CREATE: 'Create',
  DATABASE_OPERATION_ALTERCONFIGS: 'Alter configs',
  DATABASE_OPERATION_DESCRIBECONFIGS: 'Describe configs',
  ALLOW: 'Allow',
  RULE_TYPE_DESC: 'Currently, the rule type can only be "Allow".',
  GROUP: 'Group',
  TRANSACTION_ID: 'Transaction ID',
  ACL_DESC: 'Enter ACL rules to control permissions of the user.',
  // Details > Database Parameters
  DATABASE_PARAMETERS: 'Database Parameters',
  PARAMETER: 'Parameter',
  RANGE: 'Range',
  AUTO_RESTART: 'Auto Restart',
  KAFKA_PARAMETERS: 'Kafka parameters',
  ZOOKEEPER_PARAMETERS: 'ZooKeeper parameters',
  ALERTING_POLICY_CREATION_NOT_ALLOWED:
    'The current cluster status does not allow alerting policy creation.',
  EDIT_NOT_ALLOWED: 'The current cluster status does not allow parameter editing.',
  DBPARAM_REPLICAS_DESC:
    'Number of replicas for each shard. The value cannot be changed after the database cluster is created and the default value is 2.',
  DBPARAM_TCP_PORT_DESC: 'TCP port of the database cluster. The default value is 9000.',
  DBPARAM_HTTP_PORT_DESC: 'HTTP port of the database cluster. The default value is 8123.',
  DBPARAM_DATABASE_VERSION_DESC: 'Version of the database.',
  DBPARAM_SHARED_BUFFERS_DESC: 'Memory in MB used by the database server as shared buffers.',
  DBPARAM_TEMP_BUFFERS_DESC:
    'Maximum size of memory in MB used by each database session as temporary buffers.',
  DBPARAM_WORK_MEM_DESC:
    'Maximum size of memory in MB used by query operations before data is written to temporary disk files.',
  DBPARAM_MAX_WAL_SENDERS_DESC: 'Maximum number of WAL sender processes that run simultaneously.',
  DBPARAM_LOG_MIN_DURATION_STATEMENT_DESC:
    'Minimum execution time in milliseconds above which statements are logged.',
  DBPARAM_MAX_CONNECTIONS_DESC: 'Maximum number of concurrent connnections.',
  DBPARAM_EFFECTIVE_CACHE_SIZE_DESC:
    'Assumption of the planner about the effective size of the disk cache available to a single query.',
  DBPARAM_CHECKPOINT_TIMEOUT_DESC: 'Maximum time in minutes between automatic WAL checkpoints.',
  DBPARAM_VACUUM_COST_LIMIT_DESC: 'Accumulated cost that causes a vacuuming process to sleep.',
  DBPARAM_BGWRITER_DELAY_DESC:
    'Sleep time in milliseconds between activity rounds of the background writer.',
  DBPARAM_WAL_WRITER_DELAY_DESC:
    'Sleep time in milliseconds between activity rounds of the WAL writer.',
  DBPARAM_FULL_PAGE_WRITES_DESC:
    'Whether to write the entire content of a disk page to WAL when it is modified for the first time after a checkpoint.',
  DBPARAM_DEADLOCK_TIMEOUT_DESC:
    'Time in milliseconds to wait on a lock before checking whether there is a deadlock condition.',
  DBPARAM_LOG_LOCK_WAITS_DESC:
    'Whether a log message is produced when a session waits longer than deadlock_timeout.',
  DBPARAM_AUDIT_LOG_POLICY_DESC:
    'Policy adopted by the audit log plugin when writing events to its log file.',
  DBPARAM_AUDIT_LOG_FORMAT_DESC: 'Audit log file format.',
  DBPARAM_AUDIT_LOG_ROTATE_ON_SIZE_DESC:
    'Size of a single audit log file. If the value is not a multiple of 4096, the value is truncated to the nearest multiple of 4096.',
  DBPARAM_AUDIT_LOG_ROTATIONS_DESC: 'Maximum number of audit log files.',
  DBPARAM_DEFAULT_STORAGE_ENGINE_DESC:
    'Default storage engine. Only MySQL 5.7 supports the TokuDB storage engine.',
  DBPARAM_INNODB_BUFFER_POOL_SIZE_DESC:
    'Buffer pool size. 80% of the memory can be allocated at most. If the value is set to -1, 60% of the memory is allocated. The value is always increased to an integer multiple of (innodb_buffer_pool_chunk_size x innodb_buffer_pool_instances).',
  DBPARAM_MAX_ALLOWED_PACKET_DESC:
    'Maximum packet size. If the value is not a multiple of 1024, the value will be truncated to a multiple of 1024. If you need to change the value, ensure that the value is less than or equal to the value of slave_pending_jobs_size_max. Otherwise, replication between the primary and standby nodes may become abnormal.',
  DBPARAM_REPLICATION_MODE_DESC:
    'Replication mode of the database cluster. In async mode, performance is ensured while data loss may occur during a primary/standby switchover. In sync mode, data loss is prevented while performance may deteriorate. In semi-sync mode, the system implements the sync mode when all standby nodes are normal and the async mode when a standby node becomes abnormal (the sync mode is restored if the abnormal node becomes normal again).',
  DBPARAM_SET_MAX_INTSET_ENTRIES_DESC:
    'When a set consists entirely of decimal 64-bit signed integers, special structures are used to encode before how many nodes to save memory space.',
  DBPARAM_SET_MAX_INTSET_ENTRIES_DESC:
    'Intset encoding is used when a set consists entirely of Base10 64-bit signed integers and the number of elements in the set does not exceed the value of this parameter. ',
  DBPARAM_SLOWLOG_LOG_SLOWER_THAN_DESC:
    'Maximum time in microseconds allowed for operation execution. Operations that exceed the value of this parameter will be recorded in the slowlog.',
  DBPARAM_SLOWLOG_MAX_LEN_DESC: 'Maximum length of the slowlog.',
  DBPARAM_HASH_MAX_ZIPLIST_ENTRIES_DESC:
    'Ziplist encoding is used when a hash object satisfies both of the following conditions: a) The length in bytes of each key and each value of the hash object does not exceed the hash-max-ziplist-value value; b) The number of key-value pairs in the hash object does not exceed the hash-max-ziplist-entries value.',
  DBPARAM_HASH_MAX_ZIPLIST_VALUE_DESC: 'See the description of hash-max-ziplist-entries.',
  DBPARAM_LIST_MAX_ZIPLIST_ENTRIES_DESC:
    'Ziplist encoding is used when a list object satisfies both of the following conditions: a) The length in bytes of each element of the list object does not exceed the list-max-ziplist-value value; b) The number of elements in the list object does not exceed the list-max-ziplist-entries value.',
  DBPARAM_LIST_MAX_ZIPLIST_VALUE_DESC: 'See the description of list-max-ziplist-entries.',
  DBPARAM_ZSET_MAX_ZIPLIST_ENTRIES_DESC:
    'Ziplist encoding is used when a zset object satisfies both of the following conditions: a) The length in bytes of each element of the zset object does not exceed the zset-max-ziplist-value value; b) The number of elements in the zset object does not exceed the zset-max-ziplist-entries value.',
  DBPARAM_ZSET_MAX_ZIPLIST_VALUE_DESC: 'See the description of zset-max-ziplist-entries.',
  DBPARAM_LUA_TIME_LIMIT_DESC:
    'Lua script timeout limit in milliseconds. 0 or a negative value indicates that no timeout limit is used.',
  DBPARAM_IO_THREADS_DO_READS_DESC: 'Whether to enable multi-thread reading.',
  DBPARAM_IO_THREADS_DESC: 'Number of I/O threads.',
  KAFKA_EDIT_PARAMS_ERROR:
    'Failed to set parameters. When the authentication mode is TLS, the transmission encryption TLS state cannot be set to false.',
  // Details > Monitoring
  QUERIES: 'Queries',
  SELECT_QUERIES: 'SELECT Queries',
  ALL_QUERIES: 'All Queries',
  INSERTED_DATA: 'Inserted Data',
  INSERTED_ROWS: 'Inserted Rows',
  INSERTED_BYTES: 'Inserted Bytes',
  MAXIMUM_REPLICATION_DEPLAY: 'Maximum Replication Delay',
  RELATIVE_DELAY: 'Relative Delay',
  ABSOLUTE_DELAY: 'Absolute Delay',
  PARTS: 'Parts',
  CONNECTIONS: 'Connections',
  ACTIVE_CONNECTIONS: 'Active Connections',
  IDLE_IN_TRANSACTION: 'Idle in Transaction',
  IDLE_CONNECTIONS: 'Idle Connections',
  TOWARD_WRAPAROUND: 'Toward Wraparound',
  CACHE_HIT_RATIO: 'Cache Hit Rate',
  DATABASE_SIZE: 'Database Size',
  BUFFERS: 'Buffers',
  QUERY_DURATION: 'Query Duration',
  ROW_ACTIVITY: 'Row Activity',
  ACTIVITY: 'Activity',
  WAL_SIZE: 'WAL Size',
  KEY_COUNTERS: 'Key Counters',
  REPLICATION_LAG: 'Replication Lag',
  LOCKS: 'Locks',
  THREADS: 'Threads',
  ABORTED_CONNECTIONS: 'Aborted Connections',
  QUESTIONS: 'Questions',
  SELECT_BY_TYPES: 'Select by Type',
  SORT_BY_TYPES: 'Sort by Type',
  SLOW_QUERIES: 'Slow Queries',
  TABLE_LOCKS: 'Table Locks',
  TMP_TABLES_AND_FILES: 'Temporary Tables and Files',
  INBOUND_VS_OUTBOUND: 'Inbound vs Outbound',
  CLICKHOUSE_DATA_SIZE_ON_DISK: 'MergeTree Table Data Size',
  TOTAL_PARTS_OF_MERGETREE_TABLES: 'Total Parts of MergeTree Tables',
  REVICTED_KEYS: 'Revicted Keys',
  DELAYED_REJECTED_INSERTS: 'Delay/Rejected Inserts',
  DELAYED_QUERIES: 'Delayed Queries',
  DELAYED_BLOCKS: 'Delayed Blocks',
  REJECTED_BLOCKS: 'Rejected Blocks',
  DELAYED_DISTRIBUTED_FILES: 'Delayed Distributed Files',
  READ_BYTES: 'Read Bytes',
  UNCOMPRESSED: 'Uncompressed',
  COMPRESSED: 'Compressed',
  FILE_DESCRIPTOR: 'File Descriptor',
  MEMORY_FOR_QUERIES: 'Memory for Queries',
  REPLICATION_QUEUE_JOBS: 'Replication Queue Jobs',
  DATA_LOSS: 'Data Loss',
  Check: 'Check',
  CHECK_FAIL: 'Check Fail',
  FETCH: 'Fetch',
  FETCH_FAIL: 'Fetch Fail',
  FETCH_MERGED: 'Fetch Merged',
  REPLICATED_MERGED: 'Replicated Merged',
  MAX_QUEUE_SIZE: 'Max Queue Size',
  MERGES: 'Merges',
  MERGED_ROWS: 'Merged Rows',
  MERGED_UNCOMPRESSED_BYTES: 'Merged Uncompressed Bytes',
  ACTIVE_PARTS: 'Active Parts',
  DETACHED_PARTS: 'Detached Parts',
  MAX_PART_COUNT_FOR_PARTITION: 'Max part count for partition',
  CLICKHOUSE_SERVER_PROCESS_MEMORY: 'ClickHouse Server Process Memory',
  PRIMARY_KEYS_MEMORY: 'Primary Keys Memory',
  DICTIONARY_MEMORY: 'Dictionary Memory',
  MARKS_CACHE_HIT_RATE: 'Marks Cache Hit Rate',
  BACKGROUND_TASKS: 'Background Tasks',
  MERGE_MUTATE_FETCH: 'Merge/Mutate/fetch',
  CLEAN_ALTER_REPLICA_REINIT: 'Clean/Alter/Replica Re-init',
  MOVES: 'moves',
  MUTATIONS: 'Mutations',
  PARTS_TO_DO: 'Parts to Do',
  CPU_TIME_PER_SECOND: 'CPU Time per Second',
  DISK_READ_SYSCALL: 'Disk Read Syscall',
  DISK_WRITE_SYSCALL: 'Disk Write Syscall',
  NETWORK_RECEIVE: 'Network Receive',
  NETWORK_SEND: 'Network Send',
  REAL_TIME: 'Real Time',
  USER_TIME: 'User Time',
  SYSTEM_TIME: 'System Time',
  OS_IO_WAIT: 'OS IO Wait',
  OS_CPU_WAIT: 'OS CPU Wait',
  OS_CPU_VIRTUAL: 'OS CPU Virtual',
  CK_CONNECTIONS_DESC: 'Different types of connections for each server.',
  CK_DATA_SIZE_DESC: 'Data of all ClickHouse MergeTree tables.',
  CK_SELECT_QUERIES_DESC: 'Number of SELECT queries started to be interpreted and maybe executed.',
  CK_QUERIES_DESC: 'Number of queries started to be interpreted and maybe executed.',
  CK_INSERTED_DATA_DESC: 'Amount of inserted data.',
  CK_INSERTED_ROWS_DESC: 'Number of inserted rows.',
  CK_MAXIMUM_REPLICATION_DELAY_DESC: 'Replication deplay in seconds between ClickHouse servers.',
  DELAYED_REJECTED_ROWS: 'Delayed/Rejected Rows',
  READ_BYTES: 'Read Bytes',
  MYSQL_CONNECTIONS: 'MySQL Connections',
  MYSQL_CLIENT_THREAD_ACTIVITY: 'MySQL Client Thread Activity',
  MYSQL_QUESTIONS: 'MySQL Questions',
  MYSQL_THREAD_CACHE: 'MySQL Thread Cache',
  CREATED_TEMP_TABLES: 'Created Tmp Tables',
  // App Store > RadonDB ClickHouse
  SHARD_COUNT: 'Shards',
  SHARDS_DESC: 'Number of shards. The value range is 1 to 100.',
  CK_REPLICAS_DESC: 'Number of replicas for each shard. The value range is 1 to 3.',
  HTTP_PORT: 'HTTP Port',
  HTTP_PORT_DESC: 'The value range is 0 to 65535.',
  DATABASE_STORAGE_CLASS_DESC:
    'If no storage classs meets the requirements, please contact a platform administrator to create a storage class.',
  DATABASE_NODE_TIP:
    'A database node is a logical database instance rather than a physical server.',
  VALUE_RANGE_DESC: 'The value range is {min} to {max}.',
  // App Store > RadonDB PostgreSQL
  DATABASE_VERSION: 'Database Version',
  DATABASE_VERSION_DESC: 'Select the database version.',
  REPLICATION_MODE: 'Replication Mode',
  REPLICATION_MODE_DESC:
    'In async mode, performance is ensured while data loss may occur during a primary/standby switchover. In sync mode, data loss is prevented while performance may deteriorate.',
  REPLICATION_MODE_TIP:
    'Streaming replication is conducted between the primary and standby databases for data synchronization.',
  DATABASE_NAME: 'Database Name',
  STANDBY_DATABASE_COUNT: 'Standby Databases',
  PG_STANDBY_DATABASE_DESC: 'The value range is 0 to 7.',
  // App Store > RadonDB MySQL
  MYSQL_STANDBY_DATABASE_DESC: 'Number of standby databases. The value can be 1, 2, or 4.',
  PROJECT_NAME_EXCEEDS_LIMIT: 'The project name for MySQL 5.7 cannot exceed 16 characters.',
  APP_NAME_EXCEED_LIMIT: 'The app name for MySQL 5.7 cannot exceed 14 characters.',
  DATABASE_KERNEL_VERSION_DESC: 'Select the database version.',
  STANDBY_DATABASE_COUNT_DESC: 'Set the number of standby databases. The value can be 1, 2, or 4.',
  // App Store > ECK
  VOLUMN_PERSIST:
    'The capacity of the storage volume on the primary node is 20Gi and cannot be modified.',
};
