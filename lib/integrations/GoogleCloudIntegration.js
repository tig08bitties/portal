/*
   ╔═══════════════════════════════════════════════════════════╗
   ║        ⟐ GOOGLE CLOUD INTEGRATION FOR THEOS-LIMA ⟐       ║
   ║   gcloud CLI • Cloud Node.js • Autonomous Operations      ║
   ╚═══════════════════════════════════════════════════════════╝
*/

import { exec } from 'child_process';
import { promisify } from 'util';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { homedir } from 'os';

const execAsync = promisify(exec);

export class GoogleCloudIntegration {
  constructor(opts = {}) {
    this.project = opts.project || process.env.GOOGLE_CLOUD_PROJECT;
    this.credentialsPath = opts.credentialsPath || process.env.GOOGLE_APPLICATION_CREDENTIALS;
    this.configPath = opts.configPath || process.env.GCLOUD_CONFIG_PATH || join(homedir(), '.config', 'gcloud');
    this.zone = opts.zone || 'us-central1-a';
    this.region = opts.region || 'us-central1';
  }

  // Execute gcloud command
  async exec(command, opts = {}) {
    try {
      const env = { ...process.env };
      
      // Set Google Cloud environment
      if (this.project) {
        env.GOOGLE_CLOUD_PROJECT = this.project;
      }
      if (this.credentialsPath) {
        env.GOOGLE_APPLICATION_CREDENTIALS = this.credentialsPath;
      }

      const { stdout, stderr } = await execAsync(`gcloud ${command}`, {
        env,
        ...opts
      });

      return {
        success: true,
        stdout: stdout.trim(),
        stderr: stderr.trim()
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        stdout: error.stdout?.trim(),
        stderr: error.stderr?.trim()
      };
    }
  }

  // Check if gcloud is installed
  async checkInstallation() {
    const result = await this.exec('--version');
    return {
      installed: result.success,
      version: result.success ? result.stdout : null,
      error: result.success ? null : result.error
    };
  }

  // Check authentication
  async checkAuth() {
    const result = await this.exec('auth list');
    return {
      authenticated: result.success && result.stdout.includes('ACTIVE'),
      accounts: result.success ? result.stdout : null,
      error: result.success ? null : result.error
    };
  }

  // Get current project
  async getCurrentProject() {
    const result = await this.exec('config get-value project');
    if (result.success) {
      this.project = result.stdout;
      return {
        success: true,
        project: result.stdout
      };
    }
    return result;
  }

  // Set project
  async setProject(projectId) {
    const result = await this.exec(`config set project ${projectId}`);
    if (result.success) {
      this.project = projectId;
    }
    return result;
  }

  // List compute instances
  async listInstances(zone = null) {
    const zoneFlag = zone ? `--zone=${zone}` : '--filter="status:RUNNING"';
    const result = await this.exec(`compute instances list ${zoneFlag} --format=json`);
    
    if (result.success) {
      try {
        return {
          success: true,
          instances: JSON.parse(result.stdout)
        };
      } catch (e) {
        return {
          success: false,
          error: 'Failed to parse instances data'
        };
      }
    }
    return result;
  }

  // Create compute instance
  async createInstance(name, machineType = 'e2-micro', image = 'ubuntu-2004-focal-v20240125', zone = null) {
    const zoneFlag = zone ? `--zone=${zone}` : `--zone=${this.zone}`;
    const command = `compute instances create ${name} --machine-type=${machineType} --image=${image} ${zoneFlag} --format=json`;
    const result = await this.exec(command);
    
    if (result.success) {
      try {
        return {
          success: true,
          instance: JSON.parse(result.stdout)
        };
      } catch (e) {
        return {
          success: true,
          instance: { name }
        };
      }
    }
    return result;
  }

  // SSH into instance
  async ssh(instance, zone = null, command = null) {
    const zoneFlag = zone ? `--zone=${zone}` : `--zone=${this.zone}`;
    const cmd = command ? `--command="${command}"` : '';
    const result = await this.exec(`compute ssh ${instance} ${zoneFlag} ${cmd}`);
    return result;
  }

  // Check SSH keys
  async checkSSHKeys() {
    const { existsSync } = await import('fs');
    const { join } = await import('path');
    const { homedir } = await import('os');
    
    const sshDir = join(homedir(), '.ssh');
    const privateKey = join(sshDir, 'google_compute_engine');
    const publicKey = join(sshDir, 'google_compute_engine.pub');
    
    return {
      privateKey: existsSync(privateKey),
      publicKey: existsSync(publicKey),
      privateKeyPath: privateKey,
      publicKeyPath: publicKey
    };
  }

  // Generate SSH keys if needed
  async generateSSHKeys() {
    const keys = await this.checkSSHKeys();
    
    if (keys.privateKey && keys.publicKey) {
      return {
        success: true,
        message: 'SSH keys already exist',
        privateKey: keys.privateKeyPath,
        publicKey: keys.publicKeyPath
      };
    }
    
    // Keys will be generated automatically by gcloud on first SSH attempt
    return {
      success: true,
      message: 'SSH keys will be generated on first SSH connection',
      privateKey: keys.privateKeyPath,
      publicKey: keys.publicKeyPath
    };
  }

  // Check billing status
  async checkBilling() {
    const result = await this.exec('billing accounts list --format=json');
    
    if (result.success) {
      try {
        const accounts = JSON.parse(result.stdout);
        return {
          success: true,
          hasBilling: accounts && accounts.length > 0,
          accounts: accounts || []
        };
      } catch (e) {
        return {
          success: false,
          error: 'Failed to parse billing data'
        };
      }
    }
    return result;
  }

  // Check if Compute Engine API is enabled
  async checkComputeAPI() {
    const result = await this.exec('services list --enabled --filter="name:compute.googleapis.com" --format=json');
    
    if (result.success) {
      try {
        const services = JSON.parse(result.stdout);
        return {
          success: true,
          enabled: services && services.length > 0,
          services: services || []
        };
      } catch (e) {
        return {
          success: false,
          error: 'Failed to parse services data'
        };
      }
    }
    return result;
  }

  // List Cloud Functions
  async listFunctions(region = null) {
    const regionFlag = region ? `--region=${region}` : `--region=${this.region}`;
    const result = await this.exec(`functions list ${regionFlag} --format=json`);
    
    if (result.success) {
      try {
        return {
          success: true,
          functions: JSON.parse(result.stdout)
        };
      } catch (e) {
        return {
          success: false,
          error: 'Failed to parse functions data'
        };
      }
    }
    return result;
  }

  // Deploy Cloud Function
  async deployFunction(name, source, entryPoint, runtime = 'nodejs20', region = null) {
    const regionFlag = region ? `--region=${region}` : `--region=${this.region}`;
    const command = `functions deploy ${name} --source=${source} --entry-point=${entryPoint} --runtime=${runtime} ${regionFlag} --format=json`;
    const result = await this.exec(command);
    
    if (result.success) {
      try {
        return {
          success: true,
          function: JSON.parse(result.stdout)
        };
      } catch (e) {
        return {
          success: true,
          function: { name }
        };
      }
    }
    return result;
  }

  // List Cloud Run services
  async listRunServices(region = null) {
    const regionFlag = region ? `--region=${region}` : `--region=${this.region}`;
    const result = await this.exec(`run services list ${regionFlag} --format=json`);
    
    if (result.success) {
      try {
        return {
          success: true,
          services: JSON.parse(result.stdout)
        };
      } catch (e) {
        return {
          success: false,
          error: 'Failed to parse services data'
        };
      }
    }
    return result;
  }

  // Deploy Cloud Run service
  async deployRunService(name, image, region = null) {
    const regionFlag = region ? `--region=${region}` : `--region=${this.region}`;
    const command = `run deploy ${name} --image=${image} ${regionFlag} --format=json`;
    const result = await this.exec(command);
    
    if (result.success) {
      try {
        return {
          success: true,
          service: JSON.parse(result.stdout)
        };
      } catch (e) {
        return {
          success: true,
          service: { name }
        };
      }
    }
    return result;
  }

  // Get Cloud Storage buckets
  async listBuckets() {
    const result = await this.exec('storage buckets list --format=json');
    
    if (result.success) {
      try {
        return {
          success: true,
          buckets: JSON.parse(result.stdout)
        };
      } catch (e) {
        return {
          success: false,
          error: 'Failed to parse buckets data'
        };
      }
    }
    return result;
  }

  // Create Cloud Storage bucket
  async createBucket(name, location = null) {
    const locationFlag = location ? `--location=${location}` : '';
    const command = `storage buckets create gs://${name} ${locationFlag} --format=json`;
    const result = await this.exec(command);
    
    if (result.success) {
      try {
        return {
          success: true,
          bucket: JSON.parse(result.stdout)
        };
      } catch (e) {
        return {
          success: true,
          bucket: { name }
        };
      }
    }
    return result;
  }

  // Initialize gcloud (first-time setup)
  async init() {
    const result = await this.exec('init');
    return result;
  }

  // Login
  async login() {
    const result = await this.exec('auth login');
    return result;
  }

  // Application Default Credentials
  async applicationDefaultLogin() {
    const result = await this.exec('auth application-default login');
    return result;
  }

  // Get status
  async getStatus() {
    const installation = await this.checkInstallation();
    const auth = await this.checkAuth();
    const project = await this.getCurrentProject();
    
    return {
      installed: installation.installed,
      version: installation.version,
      authenticated: auth.authenticated,
      project: project.success ? project.project : null,
      configPath: this.configPath,
      zone: this.zone,
      region: this.region
    };
  }

  // Execute arbitrary gcloud command
  async command(cmd) {
    return await this.exec(cmd);
  }
}
